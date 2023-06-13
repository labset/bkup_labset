import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { MpsHomePage } from "./mps-home-page";
import { MpsLoginPage } from "./mps-login-page";

const MpsRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<MpsHomePage />} />
        <Route path="/login" element={<MpsLoginPage />} />
      </Routes>
    </HashRouter>
  );
};

export { MpsRoutes };
