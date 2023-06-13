import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { createMPSApplicationTable } from './20230602133518_create-mps-application-table';
import { createMPSAddonTable } from './20230602133545_create-mps-addon-table';
import { createMPSAddonVersionTable } from './20230602133609_create-mps-addon-version-table';

const migrations: IDynamoDbMigration[] = [
    createMPSApplicationTable,
    createMPSAddonTable,
    createMPSAddonVersionTable
];

export default migrations;
