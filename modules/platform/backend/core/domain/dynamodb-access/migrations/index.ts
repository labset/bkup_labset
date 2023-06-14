import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { createCoreAuthSessionTable } from './20230407122239_create-core-auth-session-table';
import { createCoreAuthIdentityTable } from './20230510104041_create-core-auth-identity-table';

const migrations: IDynamoDbMigration[] = [
    createCoreAuthSessionTable,
    createCoreAuthIdentityTable
];

export default migrations;
