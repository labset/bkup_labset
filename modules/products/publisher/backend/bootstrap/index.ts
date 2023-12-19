import { DynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { IPublisherDocAccess } from '@labset-publisher-backend/domain-api-access';
import {
    publisherDocAccess,
    PublisherDynamoDbClients
} from '@labset-publisher-backend/domain-dynamodb-access';

interface IPublisherDbClients {
    dynamoDbClients: PublisherDynamoDbClients;
}

interface IPublisherBootstrap {
    publisher: {
        dbClients: IPublisherDbClients;
        access: {
            doc: IPublisherDocAccess;
        };
    };
}

const publisherMigrations = async ({
    runUpgrade,
    dynamoDbClientConfig
}: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IPublisherDbClients> => {
    const dynamoDbClients = new PublisherDynamoDbClients(dynamoDbClientConfig);
    if (runUpgrade) {
        console.info('[labset-harness] run publisher dynamodb migrations');
        await dynamoDbClients.upgrade();
    }
    return { dynamoDbClients };
};

const publisherBootstrap = async (options: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IPublisherBootstrap> => {
    const { dynamoDbClients } = await publisherMigrations(options);
    const access = {
        doc: publisherDocAccess(dynamoDbClients)
    };
    return {
        publisher: {
            dbClients: {
                dynamoDbClients
            },
            access
        }
    };
};

export type { IPublisherBootstrap };
export { publisherMigrations, publisherBootstrap };
