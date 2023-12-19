import { apolloClient } from "@labset-platform-frontend-core/apollo-client";
import { publisherGateway } from "@labset-publisher-frontend/publisher-gateway-component";

const clientFactory = (token?: string) => {
  return apolloClient({
    token,
    product: { key: "mps", gatewayUrl: publisherGateway.url },
  });
};

export { clientFactory };
