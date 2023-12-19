import { coreConfiguration } from '@labset-platform-backend-core/configuration';

const tableNames = {
    publisher: {
        content: `${coreConfiguration.LABSET_ENV}-publisher-content`
    }
};

export { tableNames };
