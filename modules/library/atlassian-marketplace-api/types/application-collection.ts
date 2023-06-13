import { Application } from './application';
import { Link, LinkTemplate } from './link';

type ApplicationCollectionLinks = {
    self: Link;
    byKey: LinkTemplate;
    latestVersion: LinkTemplate;
    versionByBuild: LinkTemplate;
};

type ApplicationCollectionEmbedded = {
    applications: Application[];
};

type ApplicationCollection = {
    _links: ApplicationCollectionLinks;
    _embedded: ApplicationCollectionEmbedded;
};

export type { ApplicationCollection };
