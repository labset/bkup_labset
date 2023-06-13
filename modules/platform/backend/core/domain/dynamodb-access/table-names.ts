import { coreConfiguration } from '@labset-platform-backend-core/configuration';

const tableNames = {
    core: {
        authIdentity: `${coreConfiguration.LABSET_ENV}-core-auth-identity`,
        authSession: `${coreConfiguration.LABSET_ENV}-core-auth-session`,
        tenant: `${coreConfiguration.LABSET_ENV}-core-tenant`,
        tenantUser: `${coreConfiguration.LABSET_ENV}-core-tenant-user`
    }
};

export { tableNames };
