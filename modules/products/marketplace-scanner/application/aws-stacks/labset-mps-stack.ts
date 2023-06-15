import { mpsConfiguration } from '@labset-mps-backend/configuration';
import {
    DynamodbPolicyStatements,
    HttpLambda
} from '@labset-platform-application-base/aws-constructs';
import {
    coreConfiguration,
    LabsetEnvType
} from '@labset-platform-backend-core/configuration';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface LabsetMpsStackProps extends StackProps {
    resources: string;
    envType: LabsetEnvType;
    envVars: Record<string, string>;
}

class LabsetMpsStack extends Stack {
    constructor(
        scope: Construct,
        id: string,
        { resources, envVars, envType, ...props }: LabsetMpsStackProps
    ) {
        super(scope, id, props);
        const coreDynamodb = new DynamodbPolicyStatements(
            this,
            `${envType}-core-dynamodb-policy`,
            {
                envType,
                productName: 'core',
                env: { account: this.account, region: this.region }
            }
        );
        const mpsDynamodb = new DynamodbPolicyStatements(
            this,
            `${envType}-mps-dynamodb-policy`,
            {
                envType,
                productName: 'atlassian-marketplace',
                env: { account: this.account, region: this.region }
            }
        );

        new HttpLambda(this, `${envType}-mps-gateway`, {
            productName: 'mps',
            productBaseUrl: mpsConfiguration.BASE_URL,
            resourceName: 'mps-api-gateway',
            methods: ['GET', 'POST'],
            envType,
            envVars: {
                ...envVars,
                GOOGLE_CLIENT_ID: coreConfiguration.GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET: coreConfiguration.GOOGLE_CLIENT_SECRET,
                COOKIE_SECRET: coreConfiguration.COOKIE_SECRET
            },
            resources,
            policyStatements: [
                ...coreDynamodb.statements,
                ...mpsDynamodb.statements
            ],
            ...props
        });
    }
}

export { LabsetMpsStack };
