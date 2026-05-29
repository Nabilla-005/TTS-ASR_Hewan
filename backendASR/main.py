from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import os

from utils import convert_to_wav, extract_mfcc

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODEL
model = joblib.load("models/svm_model.pkl")
scaler = joblib.load("models/svm_scaler.pkl")
label_encoder = joblib.load("models/svm_label_encoder.pkl")

os.makedirs("temp", exist_ok=True)


@app.post("/api/asr")
async def asr(audio: UploadFile = File(...)):

    input_path = f"temp/{audio.filename}"

    with open(input_path, "wb") as f:
        f.write(await audio.read())

    wav_path = convert_to_wav(input_path)

    mfcc = extract_mfcc(wav_path)

    # FIX DIMENSI
    mfcc = np.array(mfcc).reshape(1, -1)
    mfcc = scaler.transform(mfcc)

    pred = model.predict(mfcc)[0]

    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(mfcc)[0]
        confidence = float(np.max(proba)) * 100
    else:
        confidence = 0

    return {
        "text": label_encoder.inverse_transform([pred])[0],
        "confidence": confidence,
        "mfcc": mfcc.flatten().tolist()
    }