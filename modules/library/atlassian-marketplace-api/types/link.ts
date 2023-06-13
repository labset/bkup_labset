type Link = {
    href: string;
    type?: string;
    title?: string;
};

type LinkTemplate = {
    template: string;
    type?: string;
    name?: string;
};

type SelfLinkOnly = {
    self: Link;
};

export type { Link, LinkTemplate, SelfLinkOnly };
