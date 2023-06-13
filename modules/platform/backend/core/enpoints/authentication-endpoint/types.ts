import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import { Express } from 'express';

interface AuthenticationEndpointProps {
    app: Express;
    product: {
        key: string;
        baseUrl: string;
        gatewayUrl: string;
    };
    coreServices: ICoreServices;
}

export type { AuthenticationEndpointProps };
