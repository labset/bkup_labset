import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';

import { MpsDynamoDbClients } from '../clients';

import { AddonDocEntityAccess } from './addon-doc-entity-access';
import { AddonVersionDocEntityAccess } from './addon-version-doc-entity-access';
import { ApplicationDocEntityAccess } from './application-doc-entity-access';

const mpsDocAccess = (clients: MpsDynamoDbClients): IMpsDocAccess => {
    return {
        application: new ApplicationDocEntityAccess(
            clients.ddbDoc(),
            clients.ddbData()
        ),
        addon: (applicationKey: string) =>
            new AddonDocEntityAccess(
                applicationKey,
                clients.ddbDoc(),
                clients.ddbData()
            ),
        addonVersion: (applicationKey: string, addonKey: string) =>
            new AddonVersionDocEntityAccess(
                { applicationKey: applicationKey, addonKey: addonKey },
                clients.ddbDoc(),
                clients.ddbData()
            )
    };
};

export { mpsDocAccess };
