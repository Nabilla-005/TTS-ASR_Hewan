import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

export default function ASRPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [mfcc, setMfcc] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // 🎤 START RECORDING
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("audio", blob);

        const res = await fetch("http://localhost:8000/api/asr", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setResult(data.text || "Tidak terdeteksi");
        setConfidence(data.confidence || 0);
        setMfcc(data.mfcc || []);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    recorder.start();
    setIsRecording(true);
  };

  // ⛔ STOP RECORDING
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "linear-gradient(135deg, #0f172a, #111827)",
        color: "white",
      }}
    >
      {/* HEADER */}
      <Typography variant="h3" fontWeight="bold">
        🎤 Dashboard ASR
      </Typography>

      <Typography sx={{ opacity: 0.6, mb: 3 }}>
        Uji coba Automatic Speech Recognition dengan rekaman suara
      </Typography>

      {/* CONTROL PANEL */}
      <Card sx={{ borderRadius: 4, mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            {!isRecording ? (
              <Button
                variant="contained"
                color="success"
                startIcon={<MicIcon />}
                onClick={startRecording}
              >
                Mulai Rekaman
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                onClick={stopRecording}
              >
                Berhenti Rekaman
              </Button>
            )}

            {loading && (
              <Typography sx={{ opacity: 0.7 }}>
                Memproses audio...
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* AUDIO */}
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography fontWeight="bold">
              🎧 Rekaman Audio
            </Typography>

            <Divider sx={{ my: 2 }} />

            {audioURL ? (
              <audio controls src={audioURL} style={{ width: "100%" }} />
            ) : (
              <Typography sx={{ opacity: 0.5 }}>
                Rekaman audio akan muncul di sini setelah Anda berhenti merekam
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* RESULT */}
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography fontWeight="bold">
              📝 Hasil Transkripsi 
            </Typography>

            <Divider sx={{ my: 2 }} />

            {result ? (
              <Chip
                label={result}
                color="primary"
                sx={{
                  fontSize: 16,
                  p: 2,
                  fontWeight: "bold",
                }}
              />
            ) : (
              <Typography sx={{ opacity: 0.5 }}>
                Hasil transkripsi akan muncul di sini
              </Typography>
            )}

            <Box mt={3}>
              <Typography>Confidence Score</Typography>

              <LinearProgress
                variant="determinate"
                value={confidence}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  mt: 1,
                }}
              />

              <Typography mt={1}>
                {confidence.toFixed(1)}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* MFCC SECTION */}
      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography fontWeight="bold">
            📊 Visualisasi MFCC
          </Typography>

          <Typography sx={{ opacity: 0.6, fontSize: 13 }}>
            Mel-Frequency Cepstral Coefficients (MFCC) adalah fitur yang umum digunakan dalam ASR untuk merepresentasikan karakteristik suara. Grafik di bawah menunjukkan 13 koefisien MFCC dari rekaman audio Anda.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* EMPTY STATE */}
          {mfcc.length === 0 ? (
            <Box
              sx={{
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f172a",
                borderRadius: 3,
              }}
            >
              <Typography sx={{ opacity: 0.5 }}>
                Visualisasi MFCC akan muncul di sini setelah Anda merekam suara
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 0.5,
                height: 160,
                overflowX: "auto",
                p: 1,
                background: "#0f172a",
                borderRadius: 3,
              }}
            >
              {mfcc.slice(0, 60).map((v, i) => {
                const height = Math.min(Math.abs(v) * 3, 140);

                return (
                  <Box
                    key={i}
                    sx={{
                      minWidth: 6,
                      height: `${height}px`,
                      borderRadius: 2,
                      background:
                        "linear-gradient(180deg, #60a5fa, #3b82f6, #1d4ed8)",
                      boxShadow:
                        "0 0 8px rgba(59,130,246,0.4)",
                    }}
                  />
                );
              })}
            </Box>
          )}

          {/* INFO TAGS */}
          <Box mt={2} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip label="13 Koefisien MFCC" size="small" />
            <Chip label="Frame-based Processing" size="small" />
            <Chip label="ASR Feature Input" size="small" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}