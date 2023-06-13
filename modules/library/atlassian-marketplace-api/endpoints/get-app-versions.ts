import * as querystring from 'querystring';

import { client } from '../client';
import { AddonVersionCollection } from '../types/addon-version-collection';

const api = client();

type GetAppVersionsQueryParameters = {
    offset?: number;
    limit?: number;
};

const getAppVersions = async (
    key: string,
    params?: GetAppVersionsQueryParameters
) => {
    const url = `/rest/2/addons/${key}/versions`;
    const query = querystring.stringify(params || {});
    return api.get<AddonVersionCollection>(`${url}?${query}`);
};

const getAppVersionsPaged = async (
    key: string,
    params: GetAppVersionsQueryParameters | string,
    fn: (collection: AddonVersionCollection) => Promise<void>
): Promise<unknown> => {
    const query =
        typeof params === 'string'
            ? params
            : querystring.stringify(params || {});
    const url = `/rest/2/addons/${key}/versions`;
    const { data } = await api.get<AddonVersionCollection>(`${url}?${query}`);
    await fn(data);
    const { next } = data._links;
    const nextQuery = next?.href.replace(`${url}?`, '');
    if (!nextQuery) return Promise.resolve();
    return await getAppVersionsPaged(key, nextQuery, fn);
};

export type { GetAppVersionsQueryParameters };
export { getAppVersions, getAppVersionsPaged };
