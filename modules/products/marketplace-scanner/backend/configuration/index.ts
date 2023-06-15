import { isDevelopment } from '@labset-platform-backend-core/configuration';

interface MpsConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const gatewayUrl = () => {
    if (isDevelopment()) {
        return 'https://jvflhc6us7.execute-api.us-east-1.amazonaws.com/prod/labset-gateway/mps';
    }
    return 'http://localhost:4000/labset-gateway/mps';
};

const baseUrl = () => {
    if (isDevelopment()) {
        return 'https://marketplace-scanner-a6ff2.web.app';
    }
    return 'http://localhost:8000';
};

const mpsConfiguration: MpsConfiguration = {
    BASE_URL: baseUrl(),
    GATEWAY_URL: gatewayUrl()
};

export { mpsConfiguration };
export type { MpsConfiguration };
