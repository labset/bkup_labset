import { ICoreDocAccess } from '@labset-plaform-backend-core/domain-api-access';
import { AuthIdentity } from '@labset-plaform-backend-core/domain-api-entity';

interface IAuthIdentityService {
    getIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profileId' | 'provider'>
    ): Promise<TIdentity | null>;
    getOrCreateIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profile' | 'provider' | 'profileId'>
    ): Promise<TIdentity>;
}

class AuthIdentityService implements IAuthIdentityService {
    constructor(private readonly access: ICoreDocAccess<unknown>) {}

    async getOrCreateIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profile' | 'provider' | 'profileId'>
    ): Promise<TIdentity> {
        const identity = await this.getIdentity<TIdentity>(input);
        if (identity !== null) return identity;
        const created = await this.access.authIdentity.writer.save({
            ...input,
            sort: `${input.provider}:${input.profileId}`,
            createdAt: new Date(),
            payload: {}
        });
        return created as TIdentity;
    }

    async getIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profileId' | 'provider'>
    ): Promise<TIdentity | null> {
        const identity = await this.access.authIdentity.reader.findBySort({
            sort: `${input.provider}:${input.profileId}`
        });
        if (identity === null) return null;
        return identity as TIdentity;
    }
}

export type { IAuthIdentityService };
export { AuthIdentityService };
