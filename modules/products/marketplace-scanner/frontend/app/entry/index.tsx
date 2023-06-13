import { GraphqlApiProvider } from "@labset-platform-frontend-core/graphql-api-context-provider";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { MpsRoutes } from "./../routes";
import { clientFactory } from "./client-factory";

const MpsApp = () => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#091E42",
          },
          secondary: {
            main: "rgb(153, 141, 217)",
          },
        },
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GraphqlApiProvider clientFactory={clientFactory}>
        <MpsRoutes />
      </GraphqlApiProvider>
    </ThemeProvider>
  );
};

const rootContainer = document.querySelector("#root");
if (rootContainer) {
  if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <MpsApp />);
  } else {
    createRoot(rootContainer).render(<MpsApp />);
  }
}
