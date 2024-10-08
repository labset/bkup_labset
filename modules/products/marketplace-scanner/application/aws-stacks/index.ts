#! /usr/bin/env node

import path from 'path';

import { LabsetEnvType } from '@labset-platform-backend-core/configuration';
import { App } from 'aws-cdk-lib';

import { LabsetMpsStack } from './labset-mps-stack';

const app = new App();

const resources =
    process.env.CDK_DEFAULT_RESOURCES ||
    path.join(process.cwd(), '..', 'aws-resources');

['localstack', 'development', 'production'].forEach(async (envType) => {
    new LabsetMpsStack(app, `${envType}-labset-mps`, {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT || 'test',
            region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
        },
        resources,
        envType: envType as LabsetEnvType,
        envVars: {
            LABSET_ENV: envType
        }
    });
});

app.synth();
