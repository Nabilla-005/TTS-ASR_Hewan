import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Chip,
} from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fef6e4 0%, #fde2c4 35%, #d9f99d 100%)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#3b2f2f",
              display: "flex",
              alignItems: "center",
              gap: 1,
              letterSpacing: 1,
            }}
          >
            🐾 ZooVoice AI
          </Typography>

          <Chip
            icon={<AutoAwesomeIcon />}
            label="Animal Voice Intelligence"
            sx={{
              background: "#fff7ed",
              color: "#7c2d12",
              fontWeight: "bold",
              border: "1px solid #fdba74",
            }}
          />
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        sx={{
          textAlign: "center",
          pt: 8,
          px: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#4b2e2e",
            textShadow: "2px 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          🦁 ZooVoice AI
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#5b4636",
            maxWidth: "850px",
            mx: "auto",
            lineHeight: 1.9,
            mb: 7,
            fontWeight: 400,
          }}
        >
          Aplikasi Automatic Speech Recognition dan Text-to-Speech Bahasa
          Indonesia untuk mengenali nama hewan menggunakan metode MFCC dan
          Support Vector Machine (SVM).
        </Typography>
      </Box>

      {/* CARD SECTION */}
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          px: 4,
          pb: 10,
        }}
      >
        {/* TTS CARD */}
        <Card
          onClick={() => navigate("/tts")}
          sx={{
            width: 420,
            height: 350,
            borderRadius: "30px",
            background:
              "linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)",
            color: "#4b2e2e",
            cursor: "pointer",
            transition: "0.35s",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(251,146,60,0.25)",

            "&:hover": {
              transform: "translateY(-12px) scale(1.03)",
              boxShadow: "0 20px 40px rgba(251,146,60,0.4)",
            },

            "&::before": {
              content: '""',
              position: "absolute",
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: 4,
            }}
          >
            {/* ICON */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <TextFieldsIcon sx={{ fontSize: 75 }} />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#7c2d12",
                }}
              >
                →
              </Typography>

              <GraphicEqIcon sx={{ fontSize: 75 }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              TEXT TO SPEECH
            </Typography>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.9,
                color: "#5b4636",
                fontWeight: 500,
              }}
            >
              Mengubah teks Bahasa Indonesia menjadi suara AI natural dengan
              pilihan kecepatan dan gender suara.
            </Typography>
          </CardContent>
        </Card>

        {/* ASR CARD */}
        <Card
          onClick={() => navigate("/asr")}
          sx={{
            width: 420,
            height: 350,
            borderRadius: "30px",
            background:
              "linear-gradient(135deg, #dcfce7 0%, #86efac 100%)",
            color: "#1f3b2d",
            cursor: "pointer",
            transition: "0.35s",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(34,197,94,0.25)",

            "&:hover": {
              transform: "translateY(-12px) scale(1.03)",
              boxShadow: "0 20px 40px rgba(34,197,94,0.35)",
            },

            "&::before": {
              content: '""',
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: 4,
            }}
          >
            {/* ICON */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <KeyboardVoiceIcon sx={{ fontSize: 75 }} />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#166534",
                }}
              >
                →
              </Typography>

              <TextFieldsIcon sx={{ fontSize: 75 }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              SPEECH RECOGNITION
            </Typography>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.9,
                color: "#355e3b",
                fontWeight: 500,
              }}
            >
              Mengenali suara nama hewan dan mengubahnya menjadi teks
              menggunakan MFCC dan SVM.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          pb: 4,
          color: "#5b4636",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        © 2026 ZooVoice AI • Indonesian Animal Speech Recognition System
      </Box>
    </Box>
  );
}