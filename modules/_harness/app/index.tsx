import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { HarnessRoutes } from "./routes";

const HarnessApp = () => {
  const theme = useMemo(() => createTheme(), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HarnessRoutes />
    </ThemeProvider>
  );
};

const rootContainer = document.querySelector("#root");
if (rootContainer) {
  if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <HarnessApp />);
  } else {
    createRoot(rootContainer).render(<HarnessApp />);
  }
}
