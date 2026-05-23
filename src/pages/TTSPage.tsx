import { useState } from "react";

import {
  Box, Typography, TextField, Button, MenuItem, Card, CardContent, Grid, Chip,
} from "@mui/material";

import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";

export default function TTSPage() {
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState("normal");
  const [gender, setGender] = useState("female");
  const [audioUrl, setAudioUrl] = useState("");

  // GENERATE AUDIO
  const handleGenerate = async () => {
  if (!text) {
    alert("Masukkan teks terlebih dahulu");
    return;
  }

    try {
      const apiKey = "9a6f741b01a149de8abba534f90f4996";

      // SPEED
      let rate = "0";

      if (speed === "slow") {
        rate = "-5";
      } else if (speed === "fast") {
        rate = "5";
      }

     // GENDER VOICE
let hl = "id-id";

// male
if (gender === "male") {
  hl = "en-us";
}

// female
if (gender === "female") {
  hl = "id-id";
}

      // API URL
      const url =
  `https://api.voicerss.org/?` +
  `key=${apiKey}` +
  `&hl=${hl}` +
  `&src=${encodeURIComponent(text)}` +
  `&r=${rate}` +
  `&c=MP3`;

      const response = await fetch(url);

    const blob = await response.blob();

    const localAudioUrl =
      URL.createObjectURL(blob);

    setAudioUrl(localAudioUrl);

    alert("Audio berhasil dibuat!");
  } catch (error) {
    console.error(error);
    alert("Gagal generate audio");
  }
};

  // PLAY AUDIO  
    const handlePlay = () => {
    if (!audioUrl) {
      alert("Generate audio terlebih dahulu");
      return;
    }

    const audio = new Audio(audioUrl);

    audio.play();
  };

  // DOWNLOAD AUDIO
  const handleDownload = () => {
    if (!audioUrl) {
      alert("Generate audio terlebih dahulu");
      return;
    }

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "tts-audio.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: "30px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <Grid container>
          {/* LEFT SIDE */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              background:
                "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)",
              color: "white",
              p: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <GraphicEqRoundedIcon
                  sx={{ fontSize: 40 }}
                />
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Text To Speech
              </Typography>

              <Typography
                sx={{
                  opacity: 0.85,
                  lineHeight: 1.8,
                }}
              >
                Ubah teks menjadi suara 
                dengan fitur play dan download MP3.
              </Typography>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Chip
                label="Bahasa Indonesia"
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.15)",
                  color: "white",
                  fontWeight: "bold",
                  mr: 1,
                  mb: 1,
                }}
              />

              <Chip
                label="MP3 Download"
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.15)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid
            item
            xs={12}
            md={8}
          >
            <CardContent sx={{ p: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  mb: 4,
                }}
              >
                Generate Voice
              </Typography>

              {/* INPUT TEXT */}
              <Typography
                sx={{
                  color: "#cbd5e1",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Input Text
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Masukkan teks..."
                value={text}
                onChange={(e) =>
                  setText(e.target.value)
                }
                sx={{
                  mb: 4,

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "18px",
                    background:
                      "rgba(255,255,255,0.08)",
                    color: "white",
                  },

                  "& textarea": {
                    color: "white",
                  },
                }}
              />

              {/* SETTINGS */}
              <Grid
                container
                spacing={3}
                sx={{ mb: 4 }}
              >
                {/* SPEED */}
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    Kecepatan
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    value={speed}
                    onChange={(e) =>
                      setSpeed(
                        e.target.value
                      )
                    }
                    sx={{
                      "& .MuiOutlinedInput-root":
                        {
                          borderRadius:
                            "16px",
                          background:
                            "rgba(255,255,255,0.08)",
                          color: "white",
                        },
                    }}
                  >
                    <MenuItem value="slow">
  Lambat
</MenuItem>

<MenuItem value="normal">
  Normal
</MenuItem>

<MenuItem value="fast">
  Cepat
</MenuItem>
                  </TextField>
                </Grid>

                {/* GENDER */}
<Grid
  item
  xs={12}
  md={6}
>
  <Typography
    sx={{
      color: "#cbd5e1",
      mb: 1,
      fontWeight: 600,
    }}
  >
    Gender Suara
  </Typography>

  <TextField
    select
    fullWidth
    value={gender}
    onChange={(e) =>
      setGender(e.target.value)
    }
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
        background:
          "rgba(255,255,255,0.08)",
        color: "white",
      },
    }}
  >
    <MenuItem value="male">
      Laki-laki
    </MenuItem>

    <MenuItem value="female">
      Perempuan
    </MenuItem>
  </TextField>
</Grid>
</Grid>

              {/* BUTTONS */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* GENERATE */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={
                    <RecordVoiceOverRoundedIcon />
                  }
                  onClick={handleGenerate}
                  sx={{
                    borderRadius: "14px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg,#3b82f6,#2563eb)",
                  }}
                >
                  Generate
                </Button>

                {/* PLAY */}
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={
                    <PlayArrowRoundedIcon />
                  }
                  onClick={handlePlay}
                  sx={{
                    borderRadius: "14px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "white",
                    borderColor:
                      "rgba(255,255,255,0.3)",
                  }}
                >
                  Play
                </Button>

                {/* DOWNLOAD */}
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={
                    <DownloadRoundedIcon />
                  }
                  onClick={handleDownload}
                  sx={{
                    borderRadius: "14px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "white",
                    borderColor:
                      "rgba(255,255,255,0.3)",
                  }}
                >
                  Download MP3
                </Button>
              </Box>

              {/* AUDIO PLAYER */}
              {audioUrl && (
                <Box sx={{ mt: 5 }}>
                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Hasil Audio
                  </Typography>

                  <audio
                    controls
                    src={audioUrl}
                    style={{
                      width: "100%",
                    }}
                  />
                </Box>
              )}

              {/* STATUS */}
              <Box
                sx={{
                  mt: 5,
                  p: 3,
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <RecordVoiceOverRoundedIcon
                  sx={{
                    color: "#60a5fa",
                    fontSize: 40,
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    Siap Menghasilkan Suara
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                    }}
                  >
                    Sistem siap mengubah teks menjadi suara
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}