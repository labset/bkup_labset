import { IAuthIdentityService } from '@labset-platform-backend-core/auth-identity-service';
import { IAuthSessionService } from '@labset-platform-backend-core/auth-session-service';
import { SessionData } from 'express-session';

interface ICoreServices {
    authSession: IAuthSessionService<SessionData>;
    authIdentity: IAuthIdentityService;
}

export type { ICoreServices };
