import { localstackDynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { coreMigrations } from '@labset-platform-backend-core/bootstrap';
import { isLocalstack } from '@labset-platform-backend-core/configuration';
import { withLocalstack } from '@labset-platform-backend-core/with-localstack';

const migrate = async () => {
    withLocalstack();
    const dynamoDbClientConfig = isLocalstack()
        ? localstackDynamoDbClientConfig
        : { region: process.env.CDK_DEFAULT_REGION || 'us-east-1' };
    await coreMigrations({
        runUpgrade: true,
        dynamoDbClientConfig
    });
};

migrate().then(console.info).catch(console.error);
