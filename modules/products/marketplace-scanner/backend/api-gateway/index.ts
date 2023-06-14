import { mpsConfiguration } from '@labset-mps-backend/configuration';
import { mpsAuthenticationEndpoint } from '@labset-mps-backend/mps-authentication-endpoint';
import { mpsGraphqlApiEndpoint } from '@labset-mps-backend/mps-graphql-api-endpoint';
import { ICoreBootstrap } from '@labset-platform-backend-core/bootstrap';
import { withCors } from '@labset-platform-backend-core/with-cors-middleware';
import { withPassportAuth } from '@labset-platform-backend-core/with-passport-auth-middleware';
import { Express } from 'express';

const mpsApiGateway = async ({
    app,
    core
}: { app: Express } & ICoreBootstrap) => {
    withCors({ app, options: { origin: [mpsConfiguration.BASE_URL] } });
    await withPassportAuth({ app, coreServices: { ...core.services } });
    await mpsAuthenticationEndpoint({
        app,
        coreServices: { ...core.services }
    });
    await mpsGraphqlApiEndpoint({ app, coreServices: { ...core.services } });
};

export { mpsApiGateway };
