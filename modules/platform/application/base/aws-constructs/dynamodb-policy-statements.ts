import { LabsetEnvType } from '@labset-platform-backend-core/configuration';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface DynamodbPolicyProps {
    envType: LabsetEnvType;
    productName: string;
    env: {
        account: string;
        region: string;
    };
}

class DynamodbPolicyStatements extends Construct {
    public readonly statements: PolicyStatement[];
    constructor(
        scope: Construct,
        id: string,
        { envType, productName, env }: DynamodbPolicyProps
    ) {
        super(scope, id);
        this.statements = [
            new PolicyStatement({
                actions: [
                    'dynamodb:GetItem',
                    'dynamodb:PutItem',
                    'dynamodb:DeleteItem',
                    'dynamodb:Query'
                ],
                resources: [
                    `arn:aws:dynamodb:${env.region}:${env.account}:table/${envType}-${productName}-*`
                ]
            })
        ];
    }
}

export { DynamodbPolicyStatements };
