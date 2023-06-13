import { client } from '../client';
import { ApplicationCollection } from '../types/application-collection';

const api = client();

const getApplications = async () => {
    return api.get<ApplicationCollection>(`/rest/2/applications`);
};

export { getApplications };
