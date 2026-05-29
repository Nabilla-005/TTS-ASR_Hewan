import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";


import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";

import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function TTSPage() {
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState("normal");
  const [gender, setGender] = useState("female");
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  // GET PLAYBACK SPEED
  const getPlaybackRate = () => {
    if (speed === "slow") {
      return 0.7;
    }

    if (speed === "fast") {
      return 1.5;
    }

    return 1;
  };

  // GENERATE AUDIO
  const handleGenerate = async () => {
  if (!text.trim()) {
    alert("Masukkan teks terlebih dahulu");
    return;
  }

  try {
    const apiKey =
      import.meta.env
        .VITE_ELEVENLABS_API_KEY;

    // FEMALE
    let voiceId =
      "EXAVITQu4vr4xnSDxMaL";

    // MALE
    if (gender === "male") {
      voiceId =
        "pNInz6obpgDQGcFmaJgB";
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",

        headers: {
          Accept: "audio/mpeg",

          "Content-Type":
            "application/json",

          "xi-api-key": apiKey,
        },

        body: JSON.stringify({
          text: text,

          model_id:
            "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Gagal generate audio"
      );
    }

    const blob =
      await response.blob();

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
  if (!audioRef.current) {
    alert("Generate audio terlebih dahulu");
    return;
  }

  if (speed === "slow") {
    audioRef.current.playbackRate = 0.7;
  } else if (speed === "fast") {
    audioRef.current.playbackRate = 1.5;
  } else {
    audioRef.current.playbackRate = 1;
  }

  audioRef.current.play();
};

  // DOWNLOAD AUDIO
// DOWNLOAD AUDIO
const handleDownload = () => {
  if (!audioUrl) {
    alert("Generate audio terlebih dahulu");
    return;
  }

  try {
    const a = document.createElement("a");

    a.href = audioUrl;

    a.download =
      `tts-${gender}-${speed}.mp3`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

  } catch (error) {
    console.error(error);

    alert("Gagal download audio");
  }
};

  // CONVERT AUDIO BUFFER TO WAV
  const audioBufferToWav = (
    buffer: AudioBuffer
  ) => {
    const numOfChan =
      buffer.numberOfChannels;

    const length =
      buffer.length * numOfChan * 2 + 44;

    const bufferArray =
      new ArrayBuffer(length);

    const view =
      new DataView(bufferArray);

    let offset = 0;

    const writeString = (str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(
          offset + i,
          str.charCodeAt(i)
        );
      }

      offset += str.length;
    };

    // RIFF
    writeString("RIFF");

    view.setUint32(offset, length - 8, true);
    offset += 4;

    writeString("WAVE");

    // FMT
    writeString("fmt ");

    view.setUint32(offset, 16, true);
    offset += 4;

    view.setUint16(offset, 1, true);
    offset += 2;

    view.setUint16(offset, numOfChan, true);
    offset += 2;

    view.setUint32(
      offset,
      buffer.sampleRate,
      true
    );
    offset += 4;

    view.setUint32(
      offset,
      buffer.sampleRate *
        numOfChan *
        2,
      true
    );
    offset += 4;

    view.setUint16(
      offset,
      numOfChan * 2,
      true
    );
    offset += 2;

    view.setUint16(offset, 16, true);
    offset += 2;

    // DATA
    writeString("data");

    view.setUint32(
      offset,
      length - offset - 4,
      true
    );
    offset += 4;

    const channels = [];

    for (
      let i = 0;
      i < numOfChan;
      i++
    ) {
      channels.push(
        buffer.getChannelData(i)
      );
    }

    let sample = 0;

    while (sample < buffer.length) {
      for (
        let channel = 0;
        channel < numOfChan;
        channel++
      ) {
        let s = Math.max(
          -1,
          Math.min(
            1,
            channels[channel][sample]
          )
        );

        s =
          s < 0
            ? s * 0x8000
            : s * 0x7fff;

        view.setInt16(
          offset,
          s,
          true
        );

        offset += 2;
      }

      sample++;
    }

    return new Blob([view], {
      type: "audio/wav",
    });
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #fff7ed 0%, #fde68a 35%, #fed7aa 70%, #dcfce7 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 3,
    }}
  >
    <Card
      sx={{
        width: "100%",
        maxWidth: 1200,
        borderRadius: "35px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.4)",

        boxShadow:
          "0 20px 60px rgba(0,0,0,0.18)",

        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Grid container>
        {/* LEFT SIDE */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            background:
              "linear-gradient(180deg, #f59e0b 0%, #ea580c 100%)",
            color: "white",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,
              background:
                "rgba(255,255,255,0.08)",
              borderRadius: "50%",
              top: -80,
              right: -80,
            }}
          />

          <Box>
            {/* ICON */}
            <Box
              sx={{
                width: 85,
                height: 85,
                borderRadius: "28px",
                background:
                  "rgba(255,255,255,0.18)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 4,

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <GraphicEqRoundedIcon
                sx={{
                  fontSize: 50,
                }}
              />
            </Box>

            {/* TITLE */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Text To Speech
            </Typography>

            {/* DESC */}
            <Typography
              sx={{
                opacity: 0.95,
                lineHeight: 1.9,
                fontSize: 16,
              }}
            >
              Mengubah teks Bahasa
              Indonesia menjadi suara AI
              natural dengan fitur play
              audio dan download.
            </Typography>
          </Box>

          {/* CHIP */}
          <Box sx={{ mt: 5 }}>
            <Chip
              label="Bahasa Indonesia"
              sx={{
                bgcolor:
                  "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                mr: 1,
                mb: 1,
                backdropFilter: "blur(5px)",
              }}
            />

            <Chip
              label="AI Voice Generator"
              sx={{
                bgcolor:
                  "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                mr: 1,
                mb: 1,
                backdropFilter: "blur(5px)",
              }}
            />

            <Chip
              label="Speed Control"
              sx={{
                bgcolor:
                  "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                backdropFilter: "blur(5px)",
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 8 }}>
          <CardContent sx={{ p: 5 }}>
            {/* TOP BAR */}
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mb: 4,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                startIcon={
                  <ArrowBackRoundedIcon />
                }
                onClick={() =>
                  navigate("/")
                }
                sx={{
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                  color: "#ea580c",
                  border:
                    "2px solid #fed7aa",
                  background:
                    "rgba(255,255,255,0.7)",

                  "&:hover": {
                    background: "#fff7ed",
                    borderColor: "#fb923c",
                  },
                }}
              >
                Kembali Dashboard
              </Button>

              <Chip
                label="ZooVoice AI"
                sx={{
                  bgcolor: "#ea580c",
                  color: "white",
                  fontWeight: "bold",
                  px: 1,
                  fontSize: "14px",
                }}
              />
            </Box>

            {/* TITLE */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#4b2e2e",
                mb: 4,
              }}
            >
              🎤 Generate Voice
            </Typography>

            {/* INPUT */}
            <Typography
              sx={{
                color: "#5b4636",
                mb: 1,
                fontWeight: 700,
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

                "& .MuiOutlinedInput-root":
                  {
                    borderRadius: "22px",
                    background:
                      "rgba(255,255,255,0.75)",

                    color: "#3b2f2f",

                    backdropFilter:
                      "blur(6px)",

                    "& fieldset": {
                      border:
                        "1px solid rgba(0,0,0,0.08)",
                    },

                    "&:hover fieldset": {
                      borderColor:
                        "#fb923c",
                    },

                    "&.Mui-focused fieldset":
                      {
                        borderColor:
                          "#ea580c",
                      },
                  },

                "& textarea": {
                  color: "#3b2f2f",
                },

                "& textarea::placeholder":
                  {
                    color: "#7c6f64",
                    opacity: 1,
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
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    color: "#5b4636",
                    mb: 1,
                    fontWeight: 700,
                  }}
                >
                  Kecepatan Suara
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
                          "rgba(255,255,255,0.7)",
                        color:
                          "#3b2f2f",
                      },

                    "& .MuiSvgIcon-root":
                      {
                        color:
                          "#3b2f2f",
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
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    color: "#5b4636",
                    mb: 1,
                    fontWeight: 700,
                  }}
                >
                  Gender Suara
                </Typography>

                <TextField
                  select
                  fullWidth
                  value={gender}
                  onChange={(e) =>
                    setGender(
                      e.target.value
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius:
                          "16px",
                        background:
                          "rgba(255,255,255,0.7)",
                        color:
                          "#3b2f2f",
                      },

                    "& .MuiSvgIcon-root":
                      {
                        color:
                          "#3b2f2f",
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
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",

                  background:
                    "linear-gradient(90deg,#f59e0b,#ea580c)",

                  boxShadow:
                    "0 8px 20px rgba(234,88,12,0.25)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#ea580c,#c2410c)",
                  },
                }}
              >
                Generate Voice
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
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",

                  borderColor: "#ea580c",
                  color: "#ea580c",

                  boxShadow:
                    "0 8px 20px rgba(234,88,12,0.12)",

                  "&:hover": {
                    borderColor:
                      "#c2410c",
                    background:
                      "rgba(234,88,12,0.08)",
                  },
                }}
              >
                Play Audio
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
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",

                  borderColor: "#16a34a",
                  color: "#16a34a",

                  boxShadow:
                    "0 8px 20px rgba(22,163,74,0.12)",

                  "&:hover": {
                    borderColor:
                      "#15803d",
                    background:
                      "rgba(22,163,74,0.08)",
                  },
                }}
              >
                Download Audio
              </Button>
            </Box>

            {/* AUDIO */}
            {audioUrl && (
              <Box sx={{ mt: 5 }}>
                <Typography
                  sx={{
                    color: "#5b4636",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Hasil Audio
                </Typography>

                <Box
                  sx={{
                    background:
                      "rgba(255,255,255,0.65)",
                    p: 2,
                    borderRadius: "20px",
                    border:
                      "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <audio
                    ref={audioRef}
                    controls
                    src={audioUrl}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                    onLoadedMetadata={() => {
                      if (
                        audioRef.current
                      ) {
                        audioRef.current.playbackRate =
                          getPlaybackRate();
                      }
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* STATUS */}
            <Box
              sx={{
                mt: 5,
                p: 3,
                borderRadius: "24px",
                background:
                  "rgba(255,255,255,0.55)",

                display: "flex",
                alignItems: "center",
                gap: 2,

                border:
                  "1px solid rgba(0,0,0,0.05)",

                backdropFilter:
                  "blur(10px)",
              }}
            >
              <RecordVoiceOverRoundedIcon
                sx={{
                  color: "#ea580c",
                  fontSize: 42,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: "#4b2e2e",
                    fontWeight: 700,
                  }}
                >
                  Sistem Siap Digunakan
                </Typography>

                <Typography
                  sx={{
                    color: "#5b4636",
                  }}
                >
                  ZooVoice AI siap
                  mengubah teks menjadi
                  suara natural AI
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