import path from 'path';

import dotenv from 'dotenv';

type LabsetEnvType = 'localstack' | 'development' | 'production';

interface CoreConfiguration {
    LABSET_ENV: LabsetEnvType;
    COOKIE_SECRET: string;
}

const parsedConfig: unknown = dotenv.config({
    path: path.resolve(__dirname, '.env')
}).parsed;

const parsed = (parsedConfig ?? {}) as CoreConfiguration;

const coreConfiguration: CoreConfiguration = {
    LABSET_ENV: (process.env.LABSET_ENV || 'localstack') as LabsetEnvType,
    COOKIE_SECRET: process.env.COOKIE_SECRET || parsed.COOKIE_SECRET
};

const isLocalstack = () => coreConfiguration.LABSET_ENV === 'localstack';

export { coreConfiguration, isLocalstack };
export type { CoreConfiguration, LabsetEnvType };
