import { ICoreDocAccess } from '@labset-plaform-backend-core/domain-api-access';
import {
    AuthIdentityProvider,
    GoogleAuthIdentity
} from '@labset-plaform-backend-core/domain-api-entity';
import {
    coreDocAccess,
    CoreDynamoDbClients
} from '@labset-plaform-backend-core/domain-dynamodb-access';
import { testCoreDynamoDbClients } from '@labset-plaform-backend-core/domain-test-dynamodb-access';

import { AuthIdentityService, IAuthIdentityService } from './index';

describe('auth-identity-service', () => {
    let clients: CoreDynamoDbClients;
    let access: ICoreDocAccess<unknown>;
    let service: IAuthIdentityService;

    beforeAll(async () => {
        clients = await testCoreDynamoDbClients();
        access = coreDocAccess(clients);
        service = new AuthIdentityService(access);
    });

    afterAll(async () => {
        await clients.destroy();
    });

    it('should return null if the identity does not exist', async () => {
        const authIdentity = await service.getIdentity<GoogleAuthIdentity>({
            provider: AuthIdentityProvider.GOOGLE,
            profileId: 'not-found'
        });
        expect(authIdentity).toBeNull();
    });

    it('should create an identity if none exists', async () => {
        const authIdentity =
            await service.getOrCreateIdentity<GoogleAuthIdentity>({
                provider: AuthIdentityProvider.GOOGLE,
                profileId: 'found',
                profile: { name: 'found name', email: 'found@local.dev' }
            });
        expect(authIdentity).toBeDefined();
        const found = await service.getIdentity<GoogleAuthIdentity>({
            profileId: 'found',
            provider: AuthIdentityProvider.GOOGLE
        });
        expect(found).toBeDefined();
        expect(found).toEqual(authIdentity);
    });
});
