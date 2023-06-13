import type { CodegenConfig } from '@graphql-codegen/cli';
import {
    backendPlugins,
    backendConfig,
    frontendPlugins,
    frontendConfig
} from '@labset-build/graphql-codegen';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        '../@types/backend/__generated__/api.ts': {
            schema: ['./**/index.graphql'],
            plugins: [...backendPlugins],
            config: {
                ...backendConfig,
                contextType:
                    '@labset-platform-graphql/context#ILabsetApolloContext'
            }
        },
        '../@types/frontend/__generated__/api.ts': {
            documents: ['./**/api.graphql'],
            schema: ['./**/*.graphql'],
            plugins: [...frontendPlugins],
            config: {
                ...frontendConfig
            }
        }
    }
};

export default config;
