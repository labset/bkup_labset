interface PublisherConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const gatewayUrl = () => {
    return 'http://localhost:4000/labset-gateway/publisher';
};

const baseUrl = () => {
    return 'http://localhost:7000';
};

const publisherConfiguration: PublisherConfiguration = {
    BASE_URL: baseUrl(),
    GATEWAY_URL: gatewayUrl()
};

export { publisherConfiguration };
export type { PublisherConfiguration };
