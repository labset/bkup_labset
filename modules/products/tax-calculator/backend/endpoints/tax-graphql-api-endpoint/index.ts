import { ApolloServer } from '@apollo/server';
import type { ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { withRequiredUser } from '@labset-platform-backend-core/with-required-user-middleware';
import { typeDefs } from '@labset-tax-graphql/backend-types';
import {
    ITaxApolloContext,
    TaxApolloContext
} from '@labset-tax-graphql/context';
import { Express } from 'express';

interface TaxGraphqlApiEndpointProps {
    app: Express;
    coreServices: ICoreServices;
}

const taxGraphqlApiEndpoint = async ({
    app,
    coreServices
}: TaxGraphqlApiEndpointProps) => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: {}
    });

    const plugins = [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'editor.reuseHeaders': true,
                'request.credentials': 'include'
            }
        }) as ApolloServerPlugin<ITaxApolloContext>
    ];

    const context = async ({ req }: ExpressContextFunctionArgument) => {
        if (!req.user) {
            throw Error('TaxApolloContext requires an authenticated user');
        }
        return new TaxApolloContext({ ...coreServices }, req.user.authIdentity);
    };

    const server = new ApolloServer<ITaxApolloContext>({
        schema,
        plugins,
        introspection: true
    });
    await server.start();

    app.use(
        `/labset-gateway/tax/graphql-api`,
        withRequiredUser,
        expressMiddleware(server, { context })
    );
};

export { taxGraphqlApiEndpoint };
