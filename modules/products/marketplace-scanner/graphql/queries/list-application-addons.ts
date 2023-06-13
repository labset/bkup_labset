import { QueryResolvers } from '@labset-mps-graphql/backend-types';

const listApplicationAddons: QueryResolvers['listApplicationAddons'] = async (
    _,
    _input,
    _ctx
) => {
    throw Error('implement me');
};

export { listApplicationAddons };
