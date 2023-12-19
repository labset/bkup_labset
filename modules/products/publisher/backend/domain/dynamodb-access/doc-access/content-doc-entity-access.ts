import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';
import { Content } from '@labset-publisher-backend/domain-api-entity';

import { tableNames } from './../table-names';

class ContentDocEntityReadAccess extends DocEntityReadAccess<Content> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.publisher.content,
            part: `CONTENT`
        });
    }
}

class ContentDocEntityWriteAccess extends DocEntityWriteAccess<Content> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.publisher.content,
            part: `CONTENT`
        });
    }
}

class ContentDocEntityAccess extends DocEntityAccess<Content> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(
            new ContentDocEntityReadAccess(ddbDocClient, data),
            new ContentDocEntityWriteAccess(ddbDocClient, data)
        );
    }
}

export { ContentDocEntityAccess };
