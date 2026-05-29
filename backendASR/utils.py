import librosa
import soundfile as sf
import numpy as np
import os

def convert_to_wav(input_path, output_path=None):
    if output_path is None:
        output_path = input_path.replace(".webm", ".wav")

    audio, sr = librosa.load(input_path, sr=16000, mono=True)

    sf.write(output_path, audio, sr)
    return output_path

def extract_mfcc(file_path):
    audio, sr = librosa.load(file_path, sr=16000, mono=True)

    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sr,
        n_mfcc=40
    )

    # FIX: HARUS SELALU FIX SHAPE (40 dimensi)
    mfcc = np.mean(mfcc.T, axis=0)

    # safety check
    if mfcc.shape[0] != 40:
        raise ValueError(f"MFCC shape salah: {mfcc.shape}")

    return mfcc