interface TaxConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const gatewayUrl = () => {
    return 'http://localhost:4000/labset-gateway/tax';
};

const baseUrl = () => {
    return 'http://localhost:7000';
};

const taxConfiguration: TaxConfiguration = {
    BASE_URL: baseUrl(),
    GATEWAY_URL: gatewayUrl()
};

export { taxConfiguration };
export type { TaxConfiguration };
