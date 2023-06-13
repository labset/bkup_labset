import { coreConfiguration } from '@labset-platform-backend-core/configuration';

const tableNames = {
    mps: {
        application: `${coreConfiguration.LABSET_ENV}-atlassian-marketplace-application`,
        addon: `${coreConfiguration.LABSET_ENV}-atlassian-marketplace-addon`,
        addonVersion: `${coreConfiguration.LABSET_ENV}-atlassian-marketplace-addon-version`
    }
};

export { tableNames };
