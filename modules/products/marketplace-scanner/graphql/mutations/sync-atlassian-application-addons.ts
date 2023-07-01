import { getApps } from '@labset-library/atlassian-marketplace-api';
import { MutationResolvers } from '@labset-mps-graphql/backend-types';

const syncAtlassianApplicationAddons: MutationResolvers['syncAtlassianApplicationAddons'] =
    async (_, { applicationId }, ctx) => {
        const { mpsServices } = await ctx.authenticated();
        const [, applicationKey] = applicationId.toString().split('---');
        const application = await mpsServices.application.findByKey({
            key: applicationKey
        });

        if (!application) {
            throw Error('[404] not found - handle me');
        }

        const { data } = await getApps({
            application: applicationKey,
            limit: 50
        });
        await Promise.all(
            data._embedded.addons.map(({ name, key }) =>
                mpsServices.addon.create({
                    name,
                    applicationKey,
                    addonKey: key
                })
            )
        );

        const addons = await mpsServices.addon.list({ applicationKey });
        return addons.map((addon) => ({ ...addon, application }));
    };

export { syncAtlassianApplicationAddons };
