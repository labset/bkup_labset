import type { CodegenConfig } from '@graphql-codegen/cli';
import {
    backendPlugins,
    backendConfig,
    frontendPlugins,
    frontendConfig
} from '@labset-build/graphql-codegen';

const platformCoreGraphqlSchema = './../../../../platform/graphql/core/schema';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        '../@types/backend/__generated__/api.ts': {
            schema: [
                './**/index.graphql',
                `${platformCoreGraphqlSchema}/profile/index.graphql`
            ],
            plugins: [...backendPlugins],
            config: {
                ...backendConfig,
                contextType: '@labset-tax-graphql/context#ITaxApolloContext'
            }
        },
        '../@types/frontend/__generated__/api.ts': {
            documents: [
                './**/api.graphql',
                `${platformCoreGraphqlSchema}/profile/api.graphql`
            ],
            schema: [
                './**/*.graphql',
                `${platformCoreGraphqlSchema}/profile/*.graphql`
            ],
            plugins: [...frontendPlugins],
            config: {
                ...frontendConfig
            }
        }
    }
};

export default config;
