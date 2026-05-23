import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./src/pages/Dashboard";
import TTSPage from "./src/pages/TTSPage";
import ASRPage from "./src/pages/ASRPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tts" element={<TTSPage />} />
        <Route path="/asr" element={<ASRPage />} />
      </Routes>
    </BrowserRouter>
  );
}