import { QueryResolvers } from '@labset-mps-graphql/backend-types';

const listApplications: QueryResolvers['listApplications'] = async (
    _,
    _input,
    ctx
) => {
    const { mpsServices } = await ctx.authenticated();
    return mpsServices.application.list();
};

export { listApplications };
