type LabsetEnvType = 'localstack' | 'development' | 'production';

interface CoreConfiguration {
    LABSET_ENV: LabsetEnvType;
}

const coreConfiguration: CoreConfiguration = {
    LABSET_ENV: (process.env.LABSET_ENV || 'localstack') as LabsetEnvType
};

export { coreConfiguration };
export type { CoreConfiguration, LabsetEnvType };
