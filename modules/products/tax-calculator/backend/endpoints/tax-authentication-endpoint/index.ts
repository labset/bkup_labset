import { authenticationEndpoint } from '@labset-platform-backend-core/authentication-endpoint';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { taxConfiguration } from '@labset-tax-backend/configuration';
import { Express } from 'express';

interface TaxAuthenticationEndpoint {
    app: Express;
    coreServices: ICoreServices;
}

const taxAuthenticationEndpoint = async ({
    app,
    coreServices
}: TaxAuthenticationEndpoint) => {
    await authenticationEndpoint({
        app,
        coreServices,
        product: {
            key: 'tax',
            baseUrl: taxConfiguration.BASE_URL,
            gatewayUrl: taxConfiguration.GATEWAY_URL
        }
    });
};

export { taxAuthenticationEndpoint };
