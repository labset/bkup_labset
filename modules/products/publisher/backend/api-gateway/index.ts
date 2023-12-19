import { ICoreBootstrap } from '@labset-platform-backend-core/bootstrap';
import { withCors } from '@labset-platform-backend-core/with-cors-middleware';
import { withPassportAuth } from '@labset-platform-backend-core/with-passport-auth-middleware';
import { IPublisherBootstrap } from '@labset-publisher-backend/boostrap';
import { publisherConfiguration } from '@labset-publisher-backend/configuration';
import { publisherAuthenticationEndpoint } from '@labset-publisher-backend/publisher-authentication-endpoint';
import { publisherGraphqlApiEndpoint } from '@labset-publisher-backend/publisher-graphql-api-endpoint';
import { Express } from 'express';

const publisherApiGateway = async ({
    app,
    core
}: { app: Express } & ICoreBootstrap & IPublisherBootstrap) => {
    withCors({
        app,
        product: { key: 'publisher', baseUrl: publisherConfiguration.BASE_URL }
    });
    await withPassportAuth({
        app,
        coreServices: { ...core.services },
        product: { key: 'publisher' }
    });
    await publisherAuthenticationEndpoint({
        app,
        coreServices: { ...core.services }
    });
    await publisherGraphqlApiEndpoint({
        app,
        coreServices: { ...core.services }
    });
};

export { publisherApiGateway };
