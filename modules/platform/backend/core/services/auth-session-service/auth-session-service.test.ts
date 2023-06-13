import { ICoreDocAccess } from '@labset-plaform-backend-core/domain-api-access';
import {
    coreDocAccess,
    CoreDynamoDbClients
} from '@labset-plaform-backend-core/domain-dynamodb-access';
import { testCoreDynamoDbClients } from '@labset-plaform-backend-core/domain-test-dynamodb-access';
import { DateTime } from 'luxon';
import { uid } from 'uid';

import { AuthSessionService, IAuthSessionService } from './index';

interface SessionPayload {
    key: string;
}

describe('auth-session-service', () => {
    let clients: CoreDynamoDbClients;
    let access: ICoreDocAccess<SessionPayload>;
    let service: IAuthSessionService<SessionPayload>;

    beforeAll(async () => {
        clients = await testCoreDynamoDbClients();

        access = coreDocAccess(clients);
        service = new AuthSessionService<SessionPayload>(access);
    });

    afterAll(async () => {
        await clients.destroy();
    });

    it('should return null if the session does not exist', async () => {
        const authSession = await service.getSession('not-valid');
        expect(authSession).toBeNull();
    });

    it('should return null when setting an expired session', async () => {
        const sid = uid(20);
        const expiresAt = DateTime.now().minus({ hour: 24 }).toJSDate();
        const authSession = await service.setSession(sid, expiresAt, {
            key: 'some-key'
        });
        expect(authSession).toBeNull();
    });

    it('should return a valid session when it expires in the future', async () => {
        const sid = uid(20);
        const expiresAt = DateTime.now().plus({ hour: 24 }).toJSDate();
        const authSession = await service.setSession(sid, expiresAt, {
            key: 'some-key'
        });
        expect(authSession).toEqual(
            expect.objectContaining({
                payload: { key: 'some-key' }
            })
        );
    });
});
