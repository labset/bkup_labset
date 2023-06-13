import { AddonCategorySummary } from './addon-category-summary';
import { AddonDistributionSummary } from './addon-distribution-summary';
import { AddonVersionSummary } from './addon-version-summary';
import { ApplicationSummary } from './application-summary';
import { ImageAssetSummary } from './image-asset-summary';
import { Link, LinkTemplate } from './link';
import { ReviewCollectionSummary } from './review-collection-summary';
import { VendorSummary } from './vendor-summary';

type AddonSummaryLinks = {
    self: Link;
    alternate: Link;
    categories: Array<Link>;
    distribution: Link;
    reviews: Array<LinkTemplate>;
    vendor: Link;
    versions: Link;
    logo?: Link;
    applications?: Array<Link>;
    pricing?: Array<LinkTemplate>;
};

type AddonSummaryEmbedded = {
    applications?: Array<ApplicationSummary>;
    categories: Array<AddonCategorySummary>;
    distribution: AddonDistributionSummary;
    logo?: ImageAssetSummary;
    reviews: ReviewCollectionSummary;
    vendor?: VendorSummary;
    version?: AddonVersionSummary;
};

type AddonSummaryStatus =
    | 'private'
    | 'public'
    | 'readytolaunch'
    | 'rejected'
    | 'submitted';

type AddonSummary = {
    _links: AddonSummaryLinks;
    _embedded: AddonSummaryEmbedded;
    key: string;
    name: string;
    status: AddonSummaryStatus;
    tagLine?: string;
    summary?: string;
};

export type { AddonSummary };
