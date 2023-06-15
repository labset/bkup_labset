import { IMpsServices } from '@labset-mps-backend/boostrap';
import {
    AuthIdentity,
    AuthIdentityProvider
} from '@labset-plaform-backend-core/domain-api-entity';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import {
    ILabsetApolloContext,
    LabsetApolloContext
} from '@labset-platform-graphql-core/context';

interface IMpsAuthenticated {
    identity: AuthIdentity;
    mpsServices: IMpsServices;
}

interface IMpsApolloContext extends ILabsetApolloContext {
    authenticated: () => Promise<IMpsAuthenticated>;
}

class MpsApolloContext
    extends LabsetApolloContext
    implements IMpsApolloContext
{
    private _authenticated?: IMpsAuthenticated;

    constructor(
        private readonly mpsServices: IMpsServices,
        coreServices: ICoreServices,
        authIdentity: {
            provider: AuthIdentityProvider;
            profileId: string;
        }
    ) {
        super(coreServices, authIdentity);
    }

    async authenticated(): Promise<IMpsAuthenticated> {
        if (this._authenticated) return this._authenticated;
        const { identity } = await this.profile();
        this._authenticated = {
            identity,
            mpsServices: { ...this.mpsServices }
        };
        return this._authenticated;
    }
}

export { MpsApolloContext };
export type { IMpsApolloContext, IMpsAuthenticated };
