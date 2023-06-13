import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import {
    mpsDocAccess,
    MpsDynamoDbClients
} from '@labset-mps-backend/domain-dynamodb-access';
import { testMpsDynamoDbClients } from '@labset-mps-backend/domain-test-dynamodb-access';

import { ApplicationService, IApplicationService } from './index';

describe('application-service', () => {
    let clients: MpsDynamoDbClients;
    let access: IMpsDocAccess;
    let service: IApplicationService;

    beforeAll(async () => {
        clients = await testMpsDynamoDbClients();
        access = mpsDocAccess(clients);
        service = new ApplicationService(access);
    });

    it('should create an application  with name and key properties', async () => {
        const confluence = await service.create({
            name: 'Confluence',
            key: 'confluence'
        });

        expect(confluence).toEqual(
            expect.objectContaining({
                name: 'Confluence',
                key: 'confluence'
            })
        );

        const namespaces = await service.list();
        expect(namespaces).toHaveLength(1);
    });
});
