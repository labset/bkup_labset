interface PublisherGateway {
  url: string;
}

declare const __PUBLISHER_GATEWAY__: PublisherGateway;
const publisherGateway: PublisherGateway = __PUBLISHER_GATEWAY__;

export { publisherGateway };
