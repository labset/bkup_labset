import { QueryResolvers } from '@labset-mps-graphql/backend-types';

const getApplication: QueryResolvers['getApplication'] = async (
    _,
    { applicationId },
    ctx
) => {
    const { mpsServices } = await ctx.authenticated();
    const [, key] = applicationId.toString().split('---');
    const application = await mpsServices.application.findByKey({ key });

    if (!application) {
        throw Error('[404] not found - handle me');
    }

    return application;
};

export { getApplication };
