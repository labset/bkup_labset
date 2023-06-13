import { QueryResolvers } from '@labset-mps-graphql/backend-types';

const listApplications: QueryResolvers['listApplications'] = async (
    _,
    _input,
    _ctx
) => {
    throw Error('implement me');
};

export { listApplications };
