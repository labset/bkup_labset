import {
    CreateTableCommand,
    DeleteTableCommand,
    DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import type { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { IDynamoDbMigration } from '@labset-plaform-backend-base/domain-dynamodb-access';

import { tableNames } from './../table-names';

class CreateCoreTenantUserTable implements IDynamoDbMigration {
    readonly TableName: string;
    constructor() {
        this.TableName = tableNames.core.tenantUser;
    }

    async up(client: DynamoDBClient): Promise<void> {
        const params: CreateTableCommandInput = {
            TableName: this.TableName,
            AttributeDefinitions: [
                { AttributeName: 'part', AttributeType: 'S' },
                { AttributeName: 'sort', AttributeType: 'S' },
                { AttributeName: 'tenantSort', AttributeType: 'S' },
                { AttributeName: 'authIdentitySort', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'part', KeyType: 'HASH' },
                { AttributeName: 'sort', KeyType: 'RANGE' }
            ],
            LocalSecondaryIndexes: [
                {
                    IndexName: 'userTenantIndex',
                    KeySchema: [
                        { AttributeName: 'part', KeyType: 'HASH' },
                        { AttributeName: 'tenantSort', KeyType: 'RANGE' }
                    ],
                    Projection: {
                        ProjectionType: 'ALL'
                    }
                },
                {
                    IndexName: 'userAuthIdentityIndex',
                    KeySchema: [
                        { AttributeName: 'part', KeyType: 'HASH' },
                        { AttributeName: 'authIdentitySort', KeyType: 'RANGE' }
                    ],
                    Projection: {
                        ProjectionType: 'ALL'
                    }
                }
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

const createCoreTenantUserTable = new CreateCoreTenantUserTable();

export { createCoreTenantUserTable };
