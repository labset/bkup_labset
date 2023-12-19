import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { PublisherHomePage } from "./publisher-home-page";
import { PublisherLoginPage } from "./publisher-login-page";
import { PublisherSignInPage } from "./publisher-sign-in-page";

const MpsRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<PublisherHomePage />} />
        <Route path="/login" element={<PublisherLoginPage />} />
        <Route path="/sign-in" element={<PublisherSignInPage />} />
      </Routes>
    </HashRouter>
  );
};

export { MpsRoutes };
