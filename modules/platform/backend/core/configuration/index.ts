import path from 'path';

import dotenv from 'dotenv';

type LabsetEnvType = 'localstack' | 'development' | 'production';

interface CoreConfiguration {
    LABSET_ENV: LabsetEnvType;

    COOKIE_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    LOKI_URL: string;
    LOKI_USERNAME: string;
    LOKI_TOKEN: string;
}

const parsedConfig: unknown = dotenv.config({
    path: path.resolve(__dirname, '.env')
}).parsed;

const parsed = (parsedConfig ?? {}) as CoreConfiguration;

const coreConfiguration: CoreConfiguration = {
    LABSET_ENV: (process.env.LABSET_ENV || 'localstack') as LabsetEnvType,
    COOKIE_SECRET: process.env.COOKIE_SECRET || parsed.COOKIE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || parsed.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:
        process.env.GOOGLE_CLIENT_SECRET || parsed.GOOGLE_CLIENT_SECRET,

    LOKI_URL: process.env.LOKI_URL || parsed.LOKI_URL,
    LOKI_USERNAME: process.env.LOKI_USERNAME || parsed.LOKI_USERNAME,
    LOKI_TOKEN: process.env.LOKI_TOKEN || parsed.LOKI_TOKEN
};

const isLocalstack = () => coreConfiguration.LABSET_ENV === 'localstack';
const isDevelopment = () => coreConfiguration.LABSET_ENV === 'development';

export { coreConfiguration, isLocalstack, isDevelopment };
export type { CoreConfiguration, LabsetEnvType };
