import { isDevelopment } from '@labset-platform-backend-core/configuration';

interface TaxConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const gatewayUrl = () => {
    if (isDevelopment()) {
        return 'https://j6fp0amqre.execute-api.us-east-1.amazonaws.com/prod/labset-gateway/tax';
    }
    return 'http://localhost:4000/labset-gateway/tax';
};

const baseUrl = () => {
    if (isDevelopment()) {
        return 'https://tax-calculator-1cc6d.web.app';
    }
    return 'http://localhost:7000';
};

const taxConfiguration: TaxConfiguration = {
    BASE_URL: baseUrl(),
    GATEWAY_URL: gatewayUrl()
};

export { taxConfiguration };
export type { TaxConfiguration };
