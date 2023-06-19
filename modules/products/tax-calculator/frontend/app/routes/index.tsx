import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { TaxHomePage } from "./tax-home-page";
import { TaxLoginPage } from "./tax-login-page";
import { TaxSignInPage } from "./tax-sign-in-page";

const MpsRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<TaxHomePage />} />
        <Route path="/login" element={<TaxLoginPage />} />
        <Route path="/sign-in" element={<TaxSignInPage />} />
      </Routes>
    </HashRouter>
  );
};

export { MpsRoutes };
