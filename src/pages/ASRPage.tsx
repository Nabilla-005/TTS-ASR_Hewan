import React, { useRef, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Divider,
} from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

export default function ASRPage() {
  const navigate = useNavigate();

  const [isRecording, setIsRecording] =
    useState(false);

  const [audioURL, setAudioURL] =
    useState<string | null>(null);

  const [result, setResult] =
    useState<string>("");

  const [confidence, setConfidence] =
    useState<number>(0);

  const [mfcc, setMfcc] =
    useState<number[]>([]);

  const [loading, setLoading] =
    useState(false);

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const chunksRef = useRef<Blob[]>([]);

  // 🎤 START RECORDING
  const startRecording = async () => {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    const recorder =
      new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(
        chunksRef.current,
        {
          type: "audio/webm",
        }
      );

      const url =
        URL.createObjectURL(blob);

      setAudioURL(url);

      setLoading(true);

      try {
        const formData =
          new FormData();

        formData.append(
          "audio", 
          blob, 
          "recording.webm"
        );

        const res = await fetch(
          "http://localhost:8000/api/asr",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        console.log(data);

        setResult(
          data.text ||
            "Tidak terdeteksi"
        );

        setConfidence(
          data.confidence || 0
        );

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
        background:
          "linear-gradient(135deg,#fef6e4 0%,#fde2c4 40%,#d9f99d 100%)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#4b2e2e",
            }}
          >
            🎤 Dashboard ASR
          </Typography>

          <Typography
            sx={{
              color: "#5b4636",
              mt: 1,
            }}
          >
            Automatic Speech Recognition
            menggunakan MFCC dan SVM
          </Typography>
        </Box>

        {/* BACK BUTTON */}
        <Button
          variant="outlined"
          startIcon={
            <ArrowBackRoundedIcon />
          }
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "14px",
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
            borderColor: "#ea580c",
            color: "#ea580c",

            "&:hover": {
              borderColor: "#c2410c",
              background:
                "rgba(234,88,12,0.08)",
            },
          }}
        >
          Kembali Dashboard
        </Button>
      </Box>

      {/* CONTROL PANEL */}
      <Card
        sx={{
          borderRadius: 5,
          mb: 4,
          background:
            "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              alignItems: "center",
            }}
          >
            {!isRecording ? (
              <Button
                variant="contained"
                startIcon={<MicIcon />}
                onClick={startRecording}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  textTransform:
                    "none",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg,#16a34a,#22c55e)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#15803d,#16a34a)",
                  },
                }}
              >
                Mulai Rekaman
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<StopIcon />}
                onClick={stopRecording}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  textTransform:
                    "none",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg,#dc2626,#ef4444)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#b91c1c,#dc2626)",
                  },
                }}
              >
                Berhenti Rekaman
              </Button>
            )}

            {loading && (
              <Typography
                sx={{
                  color: "#5b4636",
                  fontWeight: 600,
                }}
              >
                Memproses audio...
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 4,
        }}
      >
        {/* AUDIO */}
        <Card
          sx={{
            borderRadius: 5,
            background:
              "rgba(255,255,255,0.7)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#4b2e2e",
                fontSize: 22,
              }}
            >
              🎧 Rekaman Audio
            </Typography>

            <Divider sx={{ my: 3 }} />

            {audioURL ? (
              <audio
                controls
                src={audioURL}
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <Typography
                sx={{
                  opacity: 0.6,
                  color: "#5b4636",
                }}
              >
                Rekaman audio akan
                muncul di sini setelah
                proses recording selesai
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* RESULT */}
        <Card
          sx={{
            borderRadius: 5,
            background:
              "rgba(255,255,255,0.7)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#4b2e2e",
                fontSize: 22,
              }}
            >
              📝 Hasil Transkripsi
            </Typography>

            <Divider sx={{ my: 3 }} />

            {result ? (
              <Chip
                label={result}
                sx={{
                  fontSize: 16,
                  p: 3,
                  fontWeight: "bold",
                  background:
                    "#16a34a",
                  color: "white",
                }}
              />
            ) : (
              <Typography
                sx={{
                  opacity: 0.6,
                  color: "#5b4636",
                }}
              >
                Hasil transkripsi akan
                muncul di sini
              </Typography>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  color: "#5b4636",
                  fontWeight: "bold",
                }}
              >
                Confidence Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={confidence}
                sx={{
                  height: 12,
                  borderRadius: 10,
                  mt: 1.5,
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  color: "#4b2e2e",
                  fontWeight: "bold",
                }}
              >
                {confidence.toFixed(1)}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

{/* MFCC */}
<Card
  sx={{
    mt: 4,
    borderRadius: 5,
    background: "rgba(255,255,255,0.7)",
  }}
>
  <CardContent sx={{ p: 4 }}>
    <Typography
      sx={{
        fontWeight: "bold",
        color: "#4b2e2e",
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      📊 Visualisasi MFCC
      <InfoOutlinedIcon fontSize="small" />
    </Typography>

    {/* SIMPLE EXPLANATION (SHORT & CLEAR) */}
    <Typography
      sx={{
        color: "#5b4636",
        mt: 1,
        fontSize: 14.5,
        lineHeight: 1.7,
      }}
    >
      MFCC adalah “sidik jari suara” yang digunakan komputer untuk mengenali
      pola suara. Nilai ini bukan kata, tapi representasi karakter suara yang
      dipakai model SVM untuk membedakan hewan.
    </Typography>

    <Divider sx={{ my: 3 }} />

    {/* EMPTY */}
    {mfcc.length === 0 ? (
      <Box
        sx={{
          height: 200,
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(15,23,42,0.9)",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ color: "white", opacity: 0.6 }}>
          Belum ada data MFCC
        </Typography>
        <Typography sx={{ color: "white", opacity: 0.4, fontSize: 12 }}>
          Rekam suara untuk melihat pola fitur audio
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          position: "relative",
          height: 220,
          borderRadius: 4,
          background: "rgba(15,23,42,0.95)",
          p: 2,
          overflowX: "auto",
        }}
      >
        {/* CENTER LINE */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "1px",
            background: "rgba(255,255,255,0.15)",
          }}
        />

        {/* BARS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            gap: 0.6,
          }}
        >
          {mfcc.slice(0, 60).map((v, i) => {
            const height = Math.min(Math.abs(v) * 4, 90);
            const isPositive = v >= 0;

            return (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: `${height}px`,
                  borderRadius: 2,
                  background: isPositive
                    ? "#22c55e"
                    : "#3b82f6",
                  alignSelf: isPositive
                    ? "flex-end"
                    : "flex-start",
                }}
              />
            );
          })}
        </Box>

        {/* SIMPLE LEGEND */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>🔵 Negatif</span>
          <span>🟢 Positif</span>
        </Box>
      </Box>
    )}

    {/* SIMPLE SUMMARY */}
    {mfcc.length > 0 && (
      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Chip label={`Features: ${mfcc.length}`} />
        <Chip label="MFCC Audio Pattern" />
        <Chip label="SVM Input Feature" />
      </Box>
    )}
  </CardContent>
</Card>
    </Box>
  );
}