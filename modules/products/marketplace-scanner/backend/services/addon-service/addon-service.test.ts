import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import { Application } from '@labset-mps-backend/domain-api-entity';
import {
    mpsDocAccess,
    MpsDynamoDbClients
} from '@labset-mps-backend/domain-dynamodb-access';
import { testMpsDynamoDbClients } from '@labset-mps-backend/domain-test-dynamodb-access';

import { AddonService, IAddonService } from './index';

describe('addon-service', () => {
    let clients: MpsDynamoDbClients;
    let access: IMpsDocAccess;
    let service: IAddonService;

    let application: Application;

    beforeAll(async () => {
        clients = await testMpsDynamoDbClients();
        access = mpsDocAccess(clients);
        service = new AddonService(access);

        application = await access.application.writer.save({
            key: 'confluence',
            name: 'Confluence',
            sort: 'confluence',
            createdAt: new Date()
        });
    });

    it('should create an addon with name and key properties', async () => {
        const someAddon = await service.create({
            name: 'Some Addon',
            addonKey: 'some-addon',
            applicationKey: application.key
        });

        expect(someAddon).toEqual(
            expect.objectContaining({
                name: 'Some Addon',
                key: 'some-addon'
            })
        );

        const applications = await service.list({
            applicationKey: application.key
        });
        expect(applications).toHaveLength(1);
    });
});
