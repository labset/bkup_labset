import path from 'path';

import type { Types } from '@graphql-codegen/plugin-helpers';

const backendConfig: Types.PluginConfig = {
    immutableTypes: true,
    mapperTypeSuffix: 'Record',
    namingConvention: {
        typeNames: 'change-case-all#pascalCase',
        enumValues: 'change-case-all#upperCase'
    },
    preResolveTypes: false
};

const backendPlugins = [
    'typescript',
    'typescript-resolvers',
    'typescript-operations',
    path.resolve(__dirname, './plugins/export-typedefs-plugin.js'),
    path.resolve(__dirname, './plugins/export-version-hash-plugin.js')
];

const frontendConfig = {
    maybeValue: 'T',
    withComponent: false,
    withHOC: false,
    withHooks: true,
    withMutationFn: true,
    reactApolloVersion: 3,
    preResolveTypes: false
};

const frontendPlugins = [
    'typescript',
    'typescript-operations',
    'typescript-react-apollo',
    'typescript-resolvers'
];

export { backendConfig, backendPlugins, frontendConfig, frontendPlugins };
