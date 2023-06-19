import { QueryResolvers } from '@labset-mps-graphql/backend-types';

const listApplicationAddons: QueryResolvers['listApplicationAddons'] = async (
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

    const addons = await mpsServices.addon.list({ applicationKey: key });
    return addons.map((addon) => ({ ...addon, application }));
};

export { listApplicationAddons };
