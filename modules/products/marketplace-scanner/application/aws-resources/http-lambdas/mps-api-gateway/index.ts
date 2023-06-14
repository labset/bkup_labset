import { mpsApiGateway } from '@labset-mps-backend/api-gateway';
import { localstackDynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { withServerlessExpress } from '@labset-platform-application-base/aws-resource-wrappers';
import { coreBootstrap } from '@labset-platform-backend-core/bootstrap';
import { isLocalstack } from '@labset-platform-backend-core/configuration';
import { Express } from 'express';

const internal = async (app: Express) => {
    const dynamoDbClientConfig = isLocalstack()
        ? localstackDynamoDbClientConfig
        : {
              region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
          };

    const { core } = await coreBootstrap({
        runUpgrade: false,
        dynamoDbClientConfig
    });
    await mpsApiGateway({ app, core });
};

export const handler = withServerlessExpress(internal);
