import { mpsApiGateway } from '@labset-mps-backend/api-gateway';
import { localstackDynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { coreBootstrap } from '@labset-platform-backend-core/bootstrap';
import { withLocalstack } from '@labset-platform-backend-core/with-localstack';
import express, { Express } from 'express';

interface WithExpressApp {
    app: Express;
}

const createExpressApp = async (): Promise<WithExpressApp> => {
    const app = express();
    return { app };
};

const configureEndpoints = async ({
    app
}: WithExpressApp): Promise<WithExpressApp> => {
    const { core } = await coreBootstrap({
        runUpgrade: true,
        dynamoDbClientConfig: localstackDynamoDbClientConfig
    });
    await mpsApiGateway({ app, core });
    return { app };
};

const startExpressApp = async ({ app }: WithExpressApp) => {
    const port = 4000;
    const server = app.listen(port, () => {
        console.info(`⚡️[labset-harness] ready at http://localhost:${port}`);
    });
    const shutdown = () => {
        console.info(`\n🛑[labset-harness] tear down`);
        server.close();
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
};

withLocalstack();
createExpressApp()
    .then(configureEndpoints)
    .then(startExpressApp)
    .catch(console.error);
