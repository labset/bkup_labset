import { getApplications } from '@labset-library/atlassian-marketplace-api';
import { MutationResolvers } from '@labset-mps-graphql/backend-types';

const syncAtlassianApplications: MutationResolvers['syncAtlassianApplications'] =
    async (_, _input, ctx) => {
        const { mpsServices } = await ctx.authenticated();
        const { data } = await getApplications();
        await Promise.all(
            data._embedded.applications.map(({ key, name }) =>
                mpsServices.application.create({ key, name })
            )
        );

        return await mpsServices.application.list();
    };

export { syncAtlassianApplications };
