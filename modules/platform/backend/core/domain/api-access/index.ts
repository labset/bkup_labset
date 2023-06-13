import { IDocEntityAccess } from '@labset-plaform-backend-base/domain-api-access';
import {
    AuthIdentity,
    AuthSession
} from '@labset-plaform-backend-core/domain-api-entity';

interface ICoreDocAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
    authIdentity: IDocEntityAccess<AuthIdentity>;
}

export type { ICoreDocAccess };
