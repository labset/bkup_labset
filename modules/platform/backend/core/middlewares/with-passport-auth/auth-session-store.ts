import { IAuthSessionService } from '@labset-platform-backend-core/auth-session-service';
import { Request } from 'express';
import { Store, SessionData, Session } from 'express-session';
import { DateTime } from 'luxon';
import { uid } from 'uid/secure';

declare module 'express-session' {
    interface SessionData {
        id: string;
        claimToken: string;
        authToken: string;
        expiresAt: Date;
    }
}

class AuthSessionStore extends Store {
    constructor(
        private readonly authSessionService: IAuthSessionService<SessionData>
    ) {
        super();
    }

    createSession(
        request: Request,
        session: SessionData
    ): Session & SessionData {
        const base = super.createSession(request, session);
        const authToken = base.authToken ?? undefined;
        const claimToken = base.claimToken ?? uid(32);
        const withTokens = { ...base, authToken, claimToken } as typeof base;
        return super.createSession(request, withTokens);
    }

    destroy(sid: string, callback?: (err?: any) => void): void {
        this.authSessionService
            .removeSession(sid)
            .then(() => callback?.())
            .catch((error) => callback?.(error));
    }

    get(
        sid: string,
        callback: (err: any, session?: SessionData | null) => void
    ): void {
        this.authSessionService
            .getSession(sid)
            .then((data) => {
                callback(null, data?.payload ?? null);
            })
            .catch((error) => callback(error));
    }

    set(
        sid: string,
        session: SessionData,
        callback?: (err?: any) => void
    ): void {
        const expiresAt =
            session.cookie.expires ??
            DateTime.now().plus({ hour: 24 }).toJSDate();
        this.authSessionService
            .setSession(sid, expiresAt, session)
            .then(() => callback?.())
            .catch((error) => callback?.(error));
    }
}

export { AuthSessionStore };
