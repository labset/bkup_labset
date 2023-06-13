import serverlessExpress from '@vendia/serverless-express';
import {
    APIGatewayProxyCallback,
    APIGatewayProxyEvent,
    Context,
    Handler
} from 'aws-lambda';
import express, { Express } from 'express';

type ServerlessExpressFn = (app: Express) => Promise<void>;

const withServerlessExpress = (fn: ServerlessExpressFn) => {
    let serverlessInstance: Handler | undefined = undefined;

    return async (
        event: APIGatewayProxyEvent,
        context: Context,
        callback: APIGatewayProxyCallback
    ) => {
        if (serverlessInstance) {
            return serverlessInstance(event, context, callback);
        }
        const app = express();
        await fn(app);
        serverlessInstance = serverlessExpress({ app });
        return serverlessInstance(event, context, callback);
    };
};

export { withServerlessExpress };
