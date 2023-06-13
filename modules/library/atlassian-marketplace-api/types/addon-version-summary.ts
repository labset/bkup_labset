import { AddonArtifactAssetSummary } from './addon-artifact-asset-summary';
import { AddonCategorySummary } from './addon-category-summary';
import { AddonVersionDeploymentSummary } from './addon-version-deployment-summary';
import { Link } from './link';

type AddonVersionSummaryLinks = {
    self: Link;
    artifact?: Link;
    functionalCategories: Array<Link>;
};

type AddonVersionSummaryEmbedded = {
    artifact?: AddonArtifactAssetSummary;
    functionalCategories: Array<AddonCategorySummary>;
};

type AddonVersionSummaryStatus =
    | 'private'
    | 'public'
    | 'rejected'
    | 'submitted';

type AddonVersionReleaseProperties = {
    date?: string;
    releasedBy?: string;
    beta: boolean;
    supported: boolean;
};

type AddonVersionExternalLinks = {
    binary?: string;
    documentation?: string;
    license?: string;
    learnMore?: string;
    eula?: string;
    purchase?: string;
    releaseNotes?: string;
};

type AddonVersionSummary = {
    _links: AddonVersionSummaryLinks;
    _embedded: AddonVersionSummaryEmbedded;
    name?: string;
    status?: AddonVersionSummaryStatus;
    paymentModel: 'atlassian' | 'free' | 'vendor';
    static: boolean;
    deployable: boolean;
    release: AddonVersionReleaseProperties;
    deployment: AddonVersionDeploymentSummary;
    vendorLinks: AddonVersionExternalLinks;
};

export type { AddonVersionSummary };
