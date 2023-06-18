import {
    AuthIdentity,
    AuthIdentityProvider
} from '@labset-plaform-backend-core/domain-api-entity';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import {
    ILabsetApolloContext,
    LabsetApolloContext
} from '@labset-platform-graphql-core/context';

interface ITaxAuthenticated {
    identity: AuthIdentity;
}

interface ITaxApolloContext extends ILabsetApolloContext {
    authenticated: () => Promise<ITaxAuthenticated>;
}

class TaxApolloContext
    extends LabsetApolloContext
    implements ITaxApolloContext
{
    private _authenticated?: ITaxAuthenticated;

    constructor(
        coreServices: ICoreServices,
        authIdentity: {
            provider: AuthIdentityProvider;
            profileId: string;
        }
    ) {
        super(coreServices, authIdentity);
    }

    async authenticated(): Promise<ITaxAuthenticated> {
        if (this._authenticated) return this._authenticated;
        const { identity } = await this.profile();
        this._authenticated = {
            identity
        };
        return this._authenticated;
    }
}

export { TaxApolloContext };
export type { ITaxApolloContext, ITaxAuthenticated };
