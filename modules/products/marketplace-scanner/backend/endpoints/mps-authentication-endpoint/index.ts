import { mpsConfiguration } from '@labset-mps-backend/configuration';
import { authenticationEndpoint } from '@labset-platform-backend-core/authentication-endpoint';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { Express } from 'express';

interface MpsAuthenticationEndpoint {
    app: Express;
    coreServices: ICoreServices;
}

const mpsAuthenticationEndpoint = async ({
    app,
    coreServices
}: MpsAuthenticationEndpoint) => {
    await authenticationEndpoint({
        app,
        coreServices,
        product: {
            key: 'mps',
            baseUrl: mpsConfiguration.BASE_URL,
            gatewayUrl: mpsConfiguration.GATEWAY_URL
        }
    });
};

export { mpsAuthenticationEndpoint };
