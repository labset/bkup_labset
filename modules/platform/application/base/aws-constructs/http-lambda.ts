import * as path from 'path';

import {
    coreConfiguration,
    isLocalstack,
    LabsetEnvType
} from '@labset-platform-backend-core/configuration';
import { CfnOutput } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

type HttpMethod = 'GET' | 'POST';

interface HttpLambdaProps {
    envType: LabsetEnvType;
    envVars: Record<string, string>;
    methods: HttpMethod[];
    resourceName: string;
    resources: string;
    productName: string;
    productBaseUrl: string;
    policyStatements: PolicyStatement[];
}

class HttpLambda extends Construct {
    constructor(
        scope: Construct,
        id: string,
        {
            productName,
            productBaseUrl,
            resourceName,
            resources,
            methods,
            envType,
            envVars,
            policyStatements
        }: HttpLambdaProps
    ) {
        super(scope, id);

        const instance = new NodejsFunction(
            this,
            `${envType}-http-${productName}-${resourceName}`,
            {
                runtime: Runtime.NODEJS_18_X,
                handler: 'handler',
                entry: path.join(
                    resources,
                    'http-lambdas',
                    resourceName,
                    'index.ts'
                ),
                bundling: {
                    minify: true
                },
                environment: {
                    ...envVars,
                    LOKI_URL: coreConfiguration.LOKI_URL,
                    LOKI_USERNAME: coreConfiguration.LOKI_USERNAME,
                    LOKI_TOKEN: coreConfiguration.LOKI_TOKEN
                }
            }
        );
        policyStatements.forEach((statement) =>
            instance.addToRolePolicy(statement)
        );

        const gateway = new RestApi(
            this,
            `${envType}-api-${productName}-${resourceName}`,
            {
                restApiName: `${envType}-${resourceName}`,
                defaultCorsPreflightOptions: {
                    allowOrigins: [productBaseUrl],
                    allowCredentials: true,
                    allowMethods: ['GET', 'POST'],
                    allowHeaders: ['content-type']
                }
            }
        );
        const integration = new LambdaIntegration(instance);
        const resource = gateway.root.addResource(`{proxy+}`);
        methods.forEach((method) => {
            resource.addMethod(method, integration);
        });
        if (isLocalstack()) {
            new CfnOutput(this, 'Endpoint', {
                value: `http://localhost:4566/restapis/${gateway.restApiId}/prod/_user_request_/labset-gateway/${productName}`
            });
        }
    }
}

export type { HttpLambdaProps };
export { HttpLambda };
