import {
    AuthIdentity,
    AuthIdentityProvider
} from '@labset-plaform-backend-core/domain-api-entity';
import { ICoreServices } from '@labset-platform-backend-core/bootstrap';
import {
    ILabsetApolloContext,
    LabsetApolloContext
} from '@labset-platform-graphql-core/context';

interface IPublisherAuthenticated {
    identity: AuthIdentity;
}

interface IPublisherApolloContext extends ILabsetApolloContext {
    authenticated: () => Promise<IPublisherAuthenticated>;
}

class PublisherApolloContext
    extends LabsetApolloContext
    implements IPublisherApolloContext
{
    private _authenticated?: IPublisherAuthenticated;

    constructor(
        coreServices: ICoreServices,
        authIdentity: {
            provider: AuthIdentityProvider;
            profileId: string;
        }
    ) {
        super(coreServices, authIdentity);
    }

    async authenticated(): Promise<IPublisherAuthenticated> {
        if (this._authenticated) return this._authenticated;
        const { identity } = await this.profile();
        this._authenticated = {
            identity
        };
        return this._authenticated;
    }
}

export { PublisherApolloContext };
export type { IPublisherApolloContext, IPublisherAuthenticated };
