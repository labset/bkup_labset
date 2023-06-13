import { IAuthIdentityService } from '@labset-platform-backend-core/auth-identity-service';
import { IAuthSessionService } from '@labset-platform-backend-core/auth-session-service';
import { ISecretService } from '@labset-platform-backend-core/secret-service';
import { Express } from 'express';
import { SessionData } from 'express-session';

interface AuthenticationEndpointProps {
    app: Express;
    product: {
        key: string;
        baseUrl: string;
        gatewayUrl: string;
    };
    services: {
        authIdentity: IAuthIdentityService;
        authSession: IAuthSessionService<SessionData>;
        secret: ISecretService;
    };
}

export type { AuthenticationEndpointProps };
