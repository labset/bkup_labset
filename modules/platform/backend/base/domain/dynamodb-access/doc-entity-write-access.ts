import {
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand
} from '@aws-sdk/lib-dynamodb';
import type {
    PutCommandInput,
    DeleteCommandInput
} from '@aws-sdk/lib-dynamodb';
import {
    IDocEntityWriteAccess,
    SaveDocEntityInput
} from '@labset-plaform-backend-base/domain-api-access';
import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

import { IDynamoDbData } from './data';
import { IDocEntityTable } from './types';

class DocEntityWriteAccess<TEntity extends DocEntity>
    implements IDocEntityWriteAccess<TEntity>
{
    constructor(
        private readonly ddbDocClient: DynamoDBDocumentClient,
        private readonly data: IDynamoDbData,
        private readonly table: IDocEntityTable
    ) {}

    async save(entity: SaveDocEntityInput<TEntity>): Promise<TEntity> {
        const { sort, ...record } = entity;
        const id = `${this.table.part}---${sort}`;
        const createdAt = record.createdAt ?? new Date();
        const item = {
            id,
            part: this.table.part,
            sort,
            ...record,
            createdAt,
            updatedAt: new Date()
        };
        const params: PutCommandInput = {
            TableName: this.table.name,
            Item: this.data.marshall({
                ...item
            })
        };

        await this.ddbDocClient.send(new PutCommand(params));
        // TODO: handle error
        return item as TEntity;
    }

    async remove(entity: Pick<TEntity, 'sort'>): Promise<void> {
        const params: DeleteCommandInput = {
            TableName: this.table.name,
            Key: {
                part: this.table.part,
                sort: entity.sort
            }
        };
        await this.ddbDocClient.send(new DeleteCommand(params));
    }
}

export { DocEntityWriteAccess };
