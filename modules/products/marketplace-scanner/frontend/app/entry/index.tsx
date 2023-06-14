import { mpsGateway } from "@labset-mps-frontend/mps-gateway-component";
import { AuthenticationProvider } from "@labset-platform-frontend-core/authentication-context-provider";
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
      <AuthenticationProvider
        product={{ key: "mps", gatewayUrl: mpsGateway.url }}
      >
        <GraphqlApiProvider clientFactory={clientFactory}>
          <MpsRoutes />
        </GraphqlApiProvider>
      </AuthenticationProvider>
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
