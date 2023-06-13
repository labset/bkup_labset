import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { createCoreAuthSessionTable } from './20230407122239_create-core-auth-session-table';
import { createCoreAuthIdentityTable } from './20230510104041_create-core-auth-identity-table';
import { createCoreTenantTable } from './20230510160142_create-core-tenant-table';
import { createCoreTenantUserTable } from './20230510160258_create-core-tenant-user-table';

const migrations: IDynamoDbMigration[] = [
    createCoreAuthSessionTable,
    createCoreAuthIdentityTable,
    createCoreTenantTable,
    createCoreTenantUserTable
];

export default migrations;
