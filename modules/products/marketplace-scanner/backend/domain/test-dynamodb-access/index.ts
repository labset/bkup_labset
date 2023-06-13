import { MpsDynamoDbClients } from '@labset-mps-backend/domain-dynamodb-access';

const testMPSDynamoDbClients = async (): Promise<MpsDynamoDbClients> => {
    const clients = new MpsDynamoDbClients({
        region: 'local',
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ?? 'oops'
    });
    await clients.upgrade();
    return clients;
};

export { testMPSDynamoDbClients };
