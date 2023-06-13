import {
    DocEntity,
    Identifier
} from '@labset-plaform-backend-base/domain-api-entity';

interface AuthSession<TPayload> extends DocEntity {
    expiresAt: Date;
    payload: TPayload;
}

enum AuthIdentityProvider {
    GOOGLE = 'GOOGLE'
}

interface AuthIdentity extends DocEntity {
    profileId: Identifier;
    provider: AuthIdentityProvider;
    profile: Record<string, unknown> & { name?: string; picture?: string };
    payload: Record<string, unknown>;
}

interface AuthIdentityAwareDocEntity extends DocEntity {
    authIdentitySort: Identifier;
}

interface GoogleAuthIdentity extends AuthIdentity {
    provider: AuthIdentityProvider.GOOGLE;
}

export { AuthIdentityProvider };

export type {
    AuthIdentity,
    AuthIdentityAwareDocEntity,
    AuthSession,
    GoogleAuthIdentity
};
