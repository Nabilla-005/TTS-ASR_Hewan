import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#dfe8ef",
      }}
    >
      {/* HEADER */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🎤 VoiceAI Studio
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 5,
          }}
        >
          <MicIcon />
          VoiceAI Studio - Dashboard
        </Typography>

        {/* CARD CONTAINER */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {/* TTS CARD */}
          <Card
            onClick={() => navigate("/tts")}
            sx={{
              flex: 1,
              minWidth: "320px",
              height: 300,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, #4f8fe8 0%, #2f6fd1 100%)",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.03)",
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
              }}
            >
              {/* TTS = TEXT → SPEECH */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                }}
              >
                <TextFieldsIcon sx={{ fontSize: 70 }} />

                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  →
                </Typography>

                <GraphicEqIcon sx={{ fontSize: 70 }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                TEXT-TO-SPEECH (TTS)
              </Typography>

              <Typography variant="h6">
                Ubah teks menjadi suara 
              </Typography>
            </CardContent>
          </Card>

          {/* ASR CARD */}
          <Card
            onClick={() => navigate("/asr")}
            sx={{
              flex: 1,
              minWidth: "320px",
              height: 300,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, #102c63 0%, #081f4f 100%)",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.03)",
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
              }}
            >
              {/* ASR = SPEECH → TEXT */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                }}
              >
                <KeyboardVoiceIcon sx={{ fontSize: 70 }} />

                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  →
                </Typography>

                <TextFieldsIcon sx={{ fontSize: 70 }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                SPEECH RECOGNITION (ASR)
              </Typography>

              <Typography variant="h6">
                Ubah suara menjadi teks
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}