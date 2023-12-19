import { IPublisherDocAccess } from '@labset-publisher-backend/domain-api-access';

import { PublisherDynamoDbClients } from '../clients';

import { ContentDocEntityAccess } from './content-doc-entity-access';

const publisherDocAccess = (
    clients: PublisherDynamoDbClients
): IPublisherDocAccess => {
    return {
        content: new ContentDocEntityAccess(clients.ddbDoc(), clients.ddbData())
    };
};

export { publisherDocAccess };
