# 🐾 ZooVoice AI  
### Automatic Speech Recognition (ASR) & Text-to-Speech (TTS) – Hewan

---

## 📌 Detail Kelompok

**Mata Kuliah** : Pengenalan Teks dan Teks Ke Ucapan  
**Judul Projek** : Pembangunan Aplikasi Automatic Speech Recognition dan Text-to-Speech (Hewan)  
**Dosen Pengampu** : Anisa Putri Setyaningrum  

### 👥 Anggota Kelompok A7
1. 152023001 - Sintia Wati  
2. 152023005 - Nabilla Hasya Permana  
3. 152023166 - Rahma Amalia  
4. 152023200 - Fida Nujjiya  

---

# 🚀 Metode yang Digunakan

## A. Automatic Speech Recognition (ASR)

### 💡 Pengertian ASR
Automatic Speech Recognition (ASR) adalah teknologi yang mengubah ucapan manusia menjadi teks atau perintah yang dapat diproses oleh komputer. Sistem ini bekerja dengan memproses sinyal suara, menghilangkan noise, mengenali pola kata, lalu menghasilkan hasil transkripsi atau klasifikasi suara.

---

### ⚙️ Cara Kerja ASR

Sistem ASR pada aplikasi ini digunakan untuk mengenali suara hewan berdasarkan rekaman audio.

#### 1. Perekaman Suara
Pengguna merekam suara melalui mikrofon menggunakan browser.

#### 2. Konversi Audio
Format WebM dikonversi menjadi WAV (16 kHz, mono) menggunakan FFmpeg.

#### 3. Ekstraksi Fitur MFCC
Audio diproses menggunakan Mel-Frequency Cepstral Coefficients (MFCC) dengan 40 fitur.

Tahapan:
- Framing  
- Windowing  
- FFT  
- Mel Filter Bank  
- DCT  

#### 4. Feature Aggregation
Nilai MFCC dirata-ratakan menjadi satu vektor fitur.

#### 5. Normalisasi
Menggunakan Standard Scaler agar data seragam.

#### 6. Klasifikasi
Menggunakan Support Vector Machine (SVM).

#### 7. Confidence Score
Sistem menghitung tingkat keyakinan hasil prediksi.

#### 8. Output
- Label hewan
- Confidence score
- Visualisasi MFCC

---

### 🤖 Model ASR
- Support Vector Machine (SVM)
- MFCC Feature Extraction
- Standard Scaler

---

## B. Text-to-Speech (TTS)

### 💡 Pengertian TTS
Text-to-Speech (TTS) adalah teknologi yang mengubah teks menjadi suara alami menggunakan kecerdasan buatan.

---

### 🧰 Library & Teknologi
| No | Teknologi | Fungsi |
|----|----------|--------|
| 1 | React | Frontend UI |
| 2 | React Router DOM | Navigasi halaman |
| 3 | Material UI | Komponen UI |
| 4 | Material UI Icons | Icon UI |
| 5 | ElevenLabs API | Text-to-Speech AI |
| 6 | Fetch API | Request API |
| 7 | Web Audio API | Playback audio |
| 8 | TypeScript | Type safety |
| 9 | Vite | Build tool |

---

### 🤖 Model TTS
- Eleven Multilingual v2 (ElevenLabs)
- Output: MP3 audio

---

### ⚙️ Cara Kerja TTS
1. User input teks  
2. Pilih gender & kecepatan suara  
3. Request ke ElevenLabs API  
4. Audio MP3 dihasilkan  
5. Audio dapat diputar / diunduh  

---

# 💻 Implementasi Program

Aplikasi **ZooVoice AI** terdiri dari:

- Frontend (React + TypeScript)
- Backend (FastAPI untuk ASR)

## 🧠 Bahasa Pemrograman
- TypeScript (Frontend)
- Python (Backend ASR)

---

## 🎨 Frontend
Fitur:
- Dashboard
- Text-to-Speech
- Automatic Speech Recognition

---

## 🎤 Modul TTS
Fitur:
- Input teks
- Pilih gender suara
- Pilih speed suara
- Generate audio
- Play audio
- Download MP3

---

## 🐾 Modul ASR
Alur:
1. Rekam suara
2. Kirim ke backend
3. Konversi ke WAV
4. Ekstraksi MFCC
5. Normalisasi
6. Prediksi SVM
7. Output hasil

Model:
- svm_model.pkl  
- svm_scaler.pkl  
- svm_label_encoder.pkl  

---

## 📊 Dataset ASR
10 kelas hewan:

| Hewan | Data |
|------|------|
| Ayam | 40 |
| Bebek | 40 |
| Cicak | 40 |
| Gajah | 40 |
| Harimau | 40 |
| Kelinci | 40 |
| Kucing | 40 |
| Panda | 40 |
| Sapi | 40 |
| Zebra | 40 |

Total: **400 audio**

---

# 📈 Pengujian & Evaluasi

## ASR Model Comparison

- SVM Accuracy: **98.75%**
- Random Forest Accuracy: **92.5%**

➡️ SVM dipilih sebagai model terbaik

---

## 📌 Kesimpulan
Model SVM memiliki performa terbaik dalam mengenali suara hewan berdasarkan fitur MFCC.

---

# 📁 Struktur Project
