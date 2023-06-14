import { isLocalstack } from '@labset-platform-backend-core/configuration';

interface MpsConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const gatewayUrl = () => {
    if (isLocalstack()) {
        return `https://zkvffrq9ol.execute-api.localhost.localstack.cloud:4566/prod/labset-gateway/mps`;
    }
    return 'http://localhost:4000/labset-gateway/mps';
};

const mpsConfiguration: MpsConfiguration = {
    BASE_URL: 'http://localhost:8000',
    GATEWAY_URL: gatewayUrl()
};

export { mpsConfiguration };
export type { MpsConfiguration };
