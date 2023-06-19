import {
    DynamodbPolicyStatements,
    HttpLambda
} from '@labset-platform-application-base/aws-constructs';
import {
    coreConfiguration,
    LabsetEnvType
} from '@labset-platform-backend-core/configuration';
import { taxConfiguration } from '@labset-tax-backend/configuration';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface LabsetMpsStackProps extends StackProps {
    resources: string;
    envType: LabsetEnvType;
    envVars: Record<string, string>;
}

class LabsetTaxStack extends Stack {
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

        new HttpLambda(this, `${envType}-tax-gateway`, {
            productName: 'tax',
            productBaseUrl: taxConfiguration.BASE_URL,
            resourceName: 'tax-api-gateway',
            methods: ['GET', 'POST'],
            envType,
            envVars: {
                ...envVars,
                GOOGLE_CLIENT_ID: coreConfiguration.GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET: coreConfiguration.GOOGLE_CLIENT_SECRET,
                COOKIE_SECRET: coreConfiguration.COOKIE_SECRET
            },
            resources,
            policyStatements: [...coreDynamodb.statements],
            ...props
        });
    }
}

export { LabsetTaxStack };
