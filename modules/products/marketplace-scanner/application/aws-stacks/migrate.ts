import { mpsMigrations } from '@labset-mps-backend/boostrap';
import { localstackDynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { isLocalstack } from '@labset-platform-backend-core/configuration';
import { withLocalstack } from '@labset-platform-backend-core/with-localstack';

const migrate = async () => {
    withLocalstack();
    const dynamoDbClientConfig = isLocalstack()
        ? localstackDynamoDbClientConfig
        : { region: process.env.CDK_DEFAULT_REGION || 'us-east-1' };
    await mpsMigrations({
        runUpgrade: true,
        dynamoDbClientConfig
    });
};

migrate().then(console.info).catch(console.error);
