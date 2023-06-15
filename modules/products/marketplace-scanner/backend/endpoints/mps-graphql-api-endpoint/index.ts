import { ApolloServer } from '@apollo/server';
import type { ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IMpsServices } from '@labset-mps-backend/boostrap';
import { typeDefs } from '@labset-mps-graphql/backend-types';
import {
    IMpsApolloContext,
    MpsApolloContext
} from '@labset-mps-graphql/context';
import * as Mutation from '@labset-mps-graphql/mutations';
import * as Query from '@labset-mps-graphql/queries';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { withRequiredUser } from '@labset-platform-backend-core/with-required-user-middleware';
import { Express } from 'express';

interface MpsGraphqlApiEndpointProps {
    app: Express;
    coreServices: ICoreServices;
    mpsServices: IMpsServices;
}

const mpsGraphqlApiEndpoint = async ({
    app,
    coreServices,
    mpsServices
}: MpsGraphqlApiEndpointProps) => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: { Query, Mutation }
    });

    const plugins = [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'editor.reuseHeaders': true,
                'request.credentials': 'include'
            }
        }) as ApolloServerPlugin<IMpsApolloContext>
    ];

    const context = async ({ req }: ExpressContextFunctionArgument) => {
        if (!req.user) {
            throw Error('MPSApolloContext requires an authenticated user');
        }
        return new MpsApolloContext(
            { ...mpsServices },
            { ...coreServices },
            req.user.authIdentity
        );
    };

    const server = new ApolloServer<IMpsApolloContext>({
        schema,
        plugins,
        introspection: true
    });
    await server.start();

    app.use(
        `/labset-gateway/mps/graphql-api`,
        withRequiredUser,
        expressMiddleware(server, { context })
    );
};

export { mpsGraphqlApiEndpoint };
