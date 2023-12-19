import { AuthenticationProvider } from "@labset-platform-frontend-core/authentication-context-provider";
import { GraphqlApiProvider } from "@labset-platform-frontend-core/graphql-api-context-provider";
import { publisherGateway } from "@labset-publisher-frontend/publisher-gateway-component";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { MpsRoutes } from "./../routes";
import { clientFactory } from "./client-factory";

const PublisherApp = () => {
  const theme = useMemo(() => createTheme({}), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthenticationProvider
        product={{ key: "publisher", gatewayUrl: publisherGateway.url }}
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
    hydrateRoot(rootContainer, <PublisherApp />);
  } else {
    createRoot(rootContainer).render(<PublisherApp />);
  }
}
