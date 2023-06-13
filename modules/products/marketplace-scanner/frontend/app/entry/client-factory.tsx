import { mpsGateway } from "@labset-mps-frontend/mps-gateway-component";
import { apolloClient } from "@labset-platform-frontend-core/apollo-client";

const clientFactory = (token?: string) => {
  return apolloClient({
    token,
    product: { key: "mps", gatewayUrl: mpsGateway.url },
  });
};

export { clientFactory };
