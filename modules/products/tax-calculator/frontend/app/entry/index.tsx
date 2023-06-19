import { AuthenticationProvider } from "@labset-platform-frontend-core/authentication-context-provider";
import { GraphqlApiProvider } from "@labset-platform-frontend-core/graphql-api-context-provider";
import { taxGateway } from "@labset-tax-frontend/tax-gateway-component";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { TaxRoutes } from "./../routes";
import { clientFactory } from "./client-factory";

const TaxApp = () => {
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
        product={{ key: "tax", gatewayUrl: taxGateway.url }}
      >
        <GraphqlApiProvider clientFactory={clientFactory}>
          <TaxRoutes />
        </GraphqlApiProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

const rootContainer = document.querySelector("#root");
if (rootContainer) {
  if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <TaxApp />);
  } else {
    createRoot(rootContainer).render(<TaxApp />);
  }
}
