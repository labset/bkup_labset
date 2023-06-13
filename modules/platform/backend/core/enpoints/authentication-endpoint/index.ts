import { claimTokenHandler } from './claim-token-handler';
import { googleAuthStrategy } from './google-auth-strategy';
import { signOutHandler } from './sign-out-handler';
import { AuthenticationEndpointProps } from './types';

const authenticationEndpoint = async ({
    app,
    product,
    services
}: AuthenticationEndpointProps) => {
    await googleAuthStrategy({ app, services, product });
    app.post(
        `/labset-gateway/${product.key}/auth/claim/token`,
        claimTokenHandler({ product })
    );
    app.get(`/labset-gateway/${product.key}/auth/sign-out`, signOutHandler());
};

export { authenticationEndpoint };
export type { AuthenticationEndpointProps };
