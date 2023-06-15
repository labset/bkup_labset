import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { HarnessHomePage } from "./harness-home-page";

const HarnessRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HarnessHomePage />} />
      </Routes>
    </HashRouter>
  );
};

export { HarnessRoutes };
