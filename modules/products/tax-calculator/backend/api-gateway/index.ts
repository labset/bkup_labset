import { ICoreBootstrap } from '@labset-platform-backend-core/bootstrap';
import { withCors } from '@labset-platform-backend-core/with-cors-middleware';
import { withPassportAuth } from '@labset-platform-backend-core/with-passport-auth-middleware';
import { taxConfiguration } from '@labset-tax-backend/configuration';
import { taxAuthenticationEndpoint } from '@labset-tax-backend/tax-authentication-endpoint';
import { taxGraphqlApiEndpoint } from '@labset-tax-backend/tax-graphql-api-endpoint';
import { Express } from 'express';

const taxApiGateway = async ({
    app,
    core
}: { app: Express } & ICoreBootstrap) => {
    withCors({
        app,
        product: { key: 'tax', baseUrl: taxConfiguration.BASE_URL }
    });
    await withPassportAuth({
        app,
        coreServices: { ...core.services },
        product: { key: 'tax' }
    });
    await taxAuthenticationEndpoint({
        app,
        coreServices: { ...core.services }
    });
    await taxGraphqlApiEndpoint({ app, coreServices: { ...core.services } });
};

export { taxApiGateway };
