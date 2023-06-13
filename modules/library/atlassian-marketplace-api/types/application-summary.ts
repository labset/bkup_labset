import { SelfLinkOnly } from './link';

type ApplicationSummary = {
    _links: SelfLinkOnly;
    name: string;
    key: string;
};

export type { ApplicationSummary };
