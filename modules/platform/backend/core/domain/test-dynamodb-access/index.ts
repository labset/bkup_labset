import { CoreDynamoDbClients } from '@labset-plaform-backend-core/domain-dynamodb-access';

const testCoreDynamoDbClients = async (): Promise<CoreDynamoDbClients> => {
    const clients = new CoreDynamoDbClients({
        region: 'local',
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ?? 'oops'
    });
    await clients.upgrade();
    return clients;
};

export { testCoreDynamoDbClients };
