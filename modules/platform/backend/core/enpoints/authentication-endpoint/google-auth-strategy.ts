import {
    AuthIdentityProvider,
    GoogleAuthIdentity
} from '@labset-plaform-backend-core/domain-api-entity';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { AuthenticationEndpointProps } from './types';

const googleAuthStrategy = async ({
    app,
    product,
    coreServices
}: AuthenticationEndpointProps) => {
    const { clientID, clientSecret } = await coreServices.secret.googleAuth();
    const google = new GoogleStrategy(
        {
            clientID,
            clientSecret,
            scope: ['profile'],
            callbackURL: `${product.gatewayUrl}/auth/google/callback`
        },
        async (_token, _refresh, profile, done) => {
            const { id, _json } = profile;
            const identity =
                await coreServices.authIdentity.getOrCreateIdentity<GoogleAuthIdentity>(
                    {
                        profileId: id,
                        provider: AuthIdentityProvider.GOOGLE,
                        profile: { ..._json }
                    }
                );
            const { profileId, provider } = identity;
            done(null, {
                authIdentity: {
                    provider,
                    profileId
                }
            });
        }
    );

    app.get(
        `/labset-gateway/${product.key}/auth/google`,
        passport.authenticate(google, {
            failureRedirect: product.baseUrl,
            keepSessionInfo: true
        })
    );

    app.get(
        `/labset-gateway/${product.key}/auth/google/callback`,
        passport.authenticate(google, {
            failureRedirect: product.baseUrl,
            keepSessionInfo: true
        }),
        (request, response) => {
            if (request.session.claimToken) {
                response.redirect(
                    `${product.baseUrl}/#/sign-in?token=${request.session.claimToken}`
                );
            } else {
                response.redirect(`${product.baseUrl}/`);
            }
        }
    );
};

export { googleAuthStrategy };
