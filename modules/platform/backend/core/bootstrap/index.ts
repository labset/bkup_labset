import { IAuthIdentityService } from '@labset-platform-backend-core/auth-identity-service';
import { IAuthSessionService } from '@labset-platform-backend-core/auth-session-service';
import { ISecretService } from '@labset-platform-backend-core/secret-service';
import { SessionData } from 'express-session';

interface ICoreServices {
    authSession: IAuthSessionService<SessionData>;
    authIdentity: IAuthIdentityService;
    secret: ISecretService;
}

export type { ICoreServices };
