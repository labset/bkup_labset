import { Link } from './link';

export type ImageAssetLinks = {
    self: Link;
    image: Link;
    unscaled: Link;
    highRes?: Link;
    smallImage?: Link;
    smallHighResImage?: Link;
};

export type ImageAssetSummary = {
    _links: ImageAssetLinks;
};
