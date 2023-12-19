import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { createMPSApplicationTable } from './20231219185613_create-publisher-content-table';

const migrations: IDynamoDbMigration[] = [createMPSApplicationTable];

export default migrations;
