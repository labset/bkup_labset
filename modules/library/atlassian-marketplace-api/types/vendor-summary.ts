import { ImageAssetSummary } from './image-asset-summary';
import { Link } from './link';

type VendorSummaryLink = {
    self: Link;
    alternate: Link;
    edit?: Link;
    logo?: Link;
};

type VendorSummaryEmbedded = {
    logo: ImageAssetSummary;
};

type VendorVerifiedStatus =
    | 'flagged'
    | 'needs-verification'
    | 'not-requested'
    | 'rejected'
    | 'requested'
    | 'verified';

type TopVendorStatus =
    | 'approved'
    | 'flagged'
    | 'needs-approval'
    | 'not-requested'
    | 'rejected'
    | 'requested';

type TopVendor = {
    status: TopVendorStatus;
};

type VendorPrograms = {
    topVendor: TopVendor;
};

type VendorSummary = {
    _links: VendorSummaryLink;
    _embedded: VendorSummaryEmbedded;
    name: string;
    verifiedStatus: VendorVerifiedStatus;
    programs: VendorPrograms;
    isAtlassian: boolean;
};

export type { VendorSummary };
