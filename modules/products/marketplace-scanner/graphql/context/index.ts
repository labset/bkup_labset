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
            identity
        };
        return this._authenticated;
    }
}

export { MpsApolloContext };
export type { IMpsApolloContext, IMpsAuthenticated };
