import { ApolloServer } from '@apollo/server';
import type { ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@labset-mps-graphql/backend-types';
import * as Mutation from '@labset-mps-graphql/mutations';
import * as Query from '@labset-mps-graphql/queries';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { withRequiredUser } from '@labset-platform-backend-core/with-required-user-middleware';
import {
    IPublisherApolloContext,
    PublisherApolloContext
} from '@labset-publisher-graphql/context';
import { Express } from 'express';

interface PublisherGraphqlApiEndpointProps {
    app: Express;
    coreServices: ICoreServices;
}

const publisherGraphqlApiEndpoint = async ({
    app,
    coreServices
}: PublisherGraphqlApiEndpointProps) => {
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
        }) as ApolloServerPlugin<IPublisherApolloContext>
    ];

    const context = async ({ req }: ExpressContextFunctionArgument) => {
        if (!req.user) {
            throw Error(
                'PublisherApolloContext requires an authenticated user'
            );
        }
        return new PublisherApolloContext(
            { ...coreServices },
            req.user.authIdentity
        );
    };

    const server = new ApolloServer<IPublisherApolloContext>({
        schema,
        plugins,
        introspection: true
    });
    await server.start();

    app.use(
        `/labset-gateway/publisher/graphql-api`,
        withRequiredUser,
        expressMiddleware(server, { context })
    );
};

export { publisherGraphqlApiEndpoint };
