import { ImageAssetSummary } from './image-asset-summary';
import { Link, LinkTemplate } from './link';

type ApplicationLinks = {
    self: Link;
    logo: Link;
    versions: LinkTemplate;
    latestVersion: Link;
    versionByBuild: LinkTemplate;
    versionByName: LinkTemplate;
    addons: Link;
    addonCategories: Link;
};

type ApplicationEmbedded = {
    logo: ImageAssetSummary;
};

type Application = {
    _links: ApplicationLinks;
    _embedded: ApplicationEmbedded;
    name: string;
    key: string;
};

export type { Application };
