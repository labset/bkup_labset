import { AddonVersionSummary } from './addon-version-summary';
import { Link, LinkTemplate } from './link';

type AddonVersionCollectionLinks = {
    self: Link;
    alternate: Link;
    query: LinkTemplate;
    byKey: LinkTemplate;
    banners: LinkTemplate;
    next?: Link;
    prev?: Array<Link>;
};

type AddonVersionCollectionEmbedded = {
    versions: Array<AddonVersionSummary>;
};

type AddonVersionCollection = {
    _links: AddonVersionCollectionLinks;
    _embedded: AddonVersionCollectionEmbedded;
    count: number;
};

export type { AddonVersionCollection };
