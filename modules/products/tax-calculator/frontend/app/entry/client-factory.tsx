import { apolloClient } from "@labset-platform-frontend-core/apollo-client";
import { taxGateway } from "@labset-tax-frontend/tax-gateway-component";

const clientFactory = (token?: string) => {
  return apolloClient({
    token,
    product: { key: "tax", gatewayUrl: taxGateway.url },
  });
};

export { clientFactory };
