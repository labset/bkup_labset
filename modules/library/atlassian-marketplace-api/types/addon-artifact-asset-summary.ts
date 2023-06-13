import { Link } from './link';

type AddonArtifactAssetLinks = {
    self: Link;
    binary: Link;
    remote?: Link;
};

type AddonArtifactAssetSummary = {
    _links: AddonArtifactAssetLinks;
};

export type { AddonArtifactAssetSummary };
