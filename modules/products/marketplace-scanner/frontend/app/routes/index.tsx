import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { MpsHomePage } from "./mps-home-page";
import { MpsLoginPage } from "./mps-login-page";
import { MpsSignInPage } from "./mps-sign-in-page";

const MpsRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<MpsHomePage />} />
        <Route path="/login" element={<MpsLoginPage />} />
        <Route path="/sign-in" element={<MpsSignInPage />} />
      </Routes>
    </HashRouter>
  );
};

export { MpsRoutes };
