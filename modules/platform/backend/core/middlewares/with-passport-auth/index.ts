import { AuthIdentityProvider } from '@labset-plaform-backend-core/domain-api-entity';
import { IAuthSessionService } from '@labset-platform-backend-core/auth-session-service';
import { isLocalstack } from '@labset-platform-backend-core/configuration';
import { ISecretService } from '@labset-platform-backend-core/secret-service';
import { Express, urlencoded, json } from 'express';
import session, { SessionData } from 'express-session';
import passport from 'passport';
import { uid } from 'uid/secure';

import { AuthSessionStore } from './auth-session-store';

interface WithPassportAuth {
    app: Express;
    coreServices: {
        authSession: IAuthSessionService<SessionData>;
        secret: ISecretService;
    };
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // noinspection JSUnusedGlobalSymbols
        interface User {
            authIdentity: {
                provider: AuthIdentityProvider;
                profileId: string;
            };
        }
    }
}

passport.serializeUser<Express.User>((user, done) => {
    done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
    done(null, user);
});

const withPassportAuth = async ({ app, coreServices }: WithPassportAuth) => {
    const { secret } = await coreServices.secret.cookie();
    const store = new AuthSessionStore(coreServices.authSession);

    app.use(
        json(),
        urlencoded({ extended: true }),
        session({
            genid: () => uid(32),
            name: `labset`,
            secret,
            store,
            resave: false,
            saveUninitialized: true,
            cookie: isLocalstack()
                ? { secure: false }
                : { secure: true, sameSite: 'none' }
        }),
        passport.initialize(),
        passport.session()
    );
};

export { withPassportAuth };
