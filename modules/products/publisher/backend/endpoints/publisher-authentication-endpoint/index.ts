import { authenticationEndpoint } from '@labset-platform-backend-core/authentication-endpoint';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { publisherConfiguration } from '@labset-publisher-backend/configuration';
import { Express } from 'express';

interface PublisherAuthenticationEndpoint {
    app: Express;
    coreServices: ICoreServices;
}

const publisherAuthenticationEndpoint = async ({
    app,
    coreServices
}: PublisherAuthenticationEndpoint) => {
    await authenticationEndpoint({
        app,
        coreServices,
        product: {
            key: 'publisher',
            baseUrl: publisherConfiguration.BASE_URL,
            gatewayUrl: publisherConfiguration.GATEWAY_URL
        }
    });
};

export { publisherAuthenticationEndpoint };
