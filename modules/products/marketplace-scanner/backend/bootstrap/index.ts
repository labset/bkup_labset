import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import {
    mpsDocAccess,
    MpsDynamoDbClients
} from '@labset-mps-backend/domain-dynamodb-access';
import { DynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';

interface IMpsDbClients {
    dynamoDbClients: MpsDynamoDbClients;
}

interface IMpsBootstrap {
    mps: {
        dbClients: IMpsDbClients;
        access: {
            doc: IMpsDocAccess;
        };
    };
}

const mpsMigrations = async ({
    runUpgrade,
    dynamoDbClientConfig
}: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IMpsDbClients> => {
    const dynamoDbClients = new MpsDynamoDbClients(dynamoDbClientConfig);
    if (runUpgrade) {
        console.info('[labset-harness] run mps dynamodb migrations');
        await dynamoDbClients.upgrade();
    }
    return { dynamoDbClients };
};

const mpsBootstrap = async (options: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IMpsBootstrap> => {
    const { dynamoDbClients } = await mpsMigrations(options);
    const access = {
        doc: mpsDocAccess(dynamoDbClients)
    };
    return {
        mps: {
            dbClients: {
                dynamoDbClients
            },
            access
        }
    };
};

export type { IMpsBootstrap };
export { mpsMigrations, mpsBootstrap };
