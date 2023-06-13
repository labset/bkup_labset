import { AddonSummary } from './addon-summary';
import type { Link, LinkTemplate } from './link';

type AddonCollectionLinks = {
    self: Link;
    alternate: Link;
    query: LinkTemplate;
    byKey: LinkTemplate;
    banners: LinkTemplate;
    next?: Array<Link>;
    prev?: Array<Link>;
};

type AddonCollectionEmbedded = {
    addons: Array<AddonSummary>;
};

type AddonCollection = {
    _links: AddonCollectionLinks;
    _embedded: AddonCollectionEmbedded;
    count: number;
};

export type { AddonCollection };
