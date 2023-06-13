import { QueryResolvers } from '@labset-platform-graphql-core/backend-types';

const getProfile: QueryResolvers['getProfile'] = async (_, _input, ctx) => {
    const { identity } = await ctx.profile();
    return {
        email: identity.profile.email ?? 'unknown',
        id: identity.id,
        name: identity.profile.name ?? 'unknown',
        pictureUrl: identity.profile.picture ?? 'unknown'
    };
};

export { getProfile };
