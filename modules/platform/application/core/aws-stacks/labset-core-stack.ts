import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

class LabsetCoreStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
    }
}

export { LabsetCoreStack };
