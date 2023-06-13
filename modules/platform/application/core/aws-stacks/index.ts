#! /usr/bin/env node

import { App } from 'aws-cdk-lib';

import { LabsetCoreStack } from './labset-core-stack';

const app = new App();

['localstack', 'development', 'production'].forEach(async (envType) => {
    new LabsetCoreStack(app, `${envType}-labset-core`, {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT || 'test',
            region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
        }
    });
});

app.synth();
