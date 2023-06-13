import {
    AuthIdentity,
    AuthIdentityProvider
} from '@labset-plaform-backend-core/domain-api-entity';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';

interface Profile {
    identity: AuthIdentity;
}

interface ILabsetApolloContext {
    profile: () => Promise<Profile>;
}

class LabsetApolloContext implements ILabsetApolloContext {
    private _profile?: Profile;

    constructor(
        private readonly coreServices: ICoreServices,
        private readonly authIdentity: {
            provider: AuthIdentityProvider;
            profileId: string;
        }
    ) {}

    async profile(): Promise<Profile> {
        if (this._profile) return this._profile;
        const identity = await this.coreServices.authIdentity.getIdentity(
            this.authIdentity
        );
        if (identity === null) {
            throw Error(
                'LabsetApolloContext expects a known authenticated user identity'
            );
        }
        this._profile = {
            identity
        };
        return this._profile;
    }
}

export { LabsetApolloContext };
export type { ILabsetApolloContext, Profile };
