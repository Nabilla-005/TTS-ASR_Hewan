import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TTSPage from "./pages/TTSPage";
import ASRPage from "./pages/ASRDashboard";

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