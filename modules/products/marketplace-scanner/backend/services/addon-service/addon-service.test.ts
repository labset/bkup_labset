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

    it('should create multiple addons with name and key properties', async () => {
        const someAddons = await service.createMultiple({
            applicationKey: application.key,
            addons: [
                { name: 'Addon One', addonKey: 'addon-one' },
                { name: 'Addon Two', addonKey: 'addon-two' }
            ]
        });

        expect(someAddons).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Addon One',
                    key: 'addon-one'
                }),
                expect.objectContaining({ name: 'Addon Two', key: 'addon-two' })
            ])
        );
    });
});
