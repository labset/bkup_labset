import * as querystring from 'querystring';

import { client } from '../client';
import { AddonCollection } from '../types';

export type GetAppsQueryParameters = {
    application?: string;
    applicationBuild?: number;
    category?: Array<string>;
    cost?: 'free' | 'marketplace' | 'orderable' | 'paid';
    filter?:
        | 'atlassian'
        | 'codegeist'
        | 'featured'
        | 'highest-rated'
        | 'name'
        | 'new'
        | 'popular'
        | 'recent'
        | 'top-grossing'
        | 'top-vendor'
        | 'trending'
        | 'verified';
    forThisUser?: boolean;
    hosting?: Array<'any' | 'cloud' | 'datacenter' | 'server'>;
    includeHidden?: 'all' | 'visibleInApp';
    includePrivate?: boolean;
    marketingLabel?: Array<string>;
    text?: string;
    withVersion?: boolean;
    offset?: number;
    limit?: number;
};

const api = client();

export const getApps = async (params?: GetAppsQueryParameters) => {
    const query = querystring.stringify(params || {});
    return api.get<AddonCollection>(`/rest/2/addons?${query}`);
};

export const getAppsPaged = async (
    params: GetAppsQueryParameters | string,
    fn: (collection: AddonCollection) => Promise<void>,
    ctx: { total: number; current: number } = { total: 0, current: 0 }
): Promise<unknown> => {
    const query =
        typeof params === 'string'
            ? params
            : querystring.stringify(params || {});
    const { data } = await api.get<AddonCollection>(`/rest/2/addons?${query}`);
    await fn(data);

    if (ctx.total > 0) {
        ctx.current += data._embedded.addons.length;
        if (ctx.current >= ctx.total) {
            return Promise.resolve();
        }
    }

    const { next } = data._links;
    const nextQuery = next
        ?.filter((n) => n.type === 'application/json')
        .map((l) => l.href.replace(/\/rest\/2\/addons\?/, ''));
    if (!nextQuery) return Promise.resolve();
    return await getAppsPaged(nextQuery[0], fn, ctx);
};
