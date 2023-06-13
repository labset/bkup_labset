import {
    CreateTableCommand,
    DeleteTableCommand,
    DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { tableNames } from './../table-names';

class CreateCoreAuthIdentityTable implements IDynamoDbMigration {
    readonly TableName: string;
    constructor() {
        this.TableName = tableNames.core.authIdentity;
    }

    async up(client: DynamoDBClient): Promise<void> {
        const params = {
            TableName: this.TableName,
            AttributeDefinitions: [
                { AttributeName: 'part', AttributeType: 'S' },
                { AttributeName: 'sort', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'part', KeyType: 'HASH' },
                { AttributeName: 'sort', KeyType: 'RANGE' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        const { TableDescription } = await client.send(
            new CreateTableCommand(params)
        );
        const { TableArn, TableName, TableStatus } = TableDescription || {};
        console.info('[labset-harness] Table Created', {
            TableName,
            TableArn,
            TableStatus
        });
    }

    async down(client: DynamoDBClient): Promise<void> {
        const params = {
            TableName: this.TableName
        };
        const data = await client.send(new DeleteTableCommand(params));
        console.info('[labset-harness] Table Deleted', data);
    }
}

const createCoreAuthIdentityTable = new CreateCoreAuthIdentityTable();

export { createCoreAuthIdentityTable };
