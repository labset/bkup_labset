import { ICoreDocAccess } from '@labset-plaform-backend-core/domain-api-access';

import { CoreDynamoDbClients } from './../clients';
import { AuthIdentityDocEntityAccess } from './auth-identity-doc-entity-access';
import { AuthSessionDocEntityAccess } from './auth-session-doc-entity-access';

const coreDocAccess = <TSessionPayload>(
    clients: CoreDynamoDbClients
): ICoreDocAccess<TSessionPayload> => {
    return {
        authSession: new AuthSessionDocEntityAccess<TSessionPayload>(
            clients.ddbDoc(),
            clients.ddbData()
        ),
        authIdentity: new AuthIdentityDocEntityAccess(
            clients.ddbDoc(),
            clients.ddbData()
        )
    };
};

export { coreDocAccess };
