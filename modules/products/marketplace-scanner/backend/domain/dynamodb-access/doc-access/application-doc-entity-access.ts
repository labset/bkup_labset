import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Application } from '@labset-mps-backend/domain-api-entity';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';

import { tableNames } from './../table-names';

class ApplicationDocEntityReadAccess extends DocEntityReadAccess<Application> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.mps.application,
            part: 'ATLASMARKET'
        });
    }
}

class ApplicationDocEntityWriteAccess extends DocEntityWriteAccess<Application> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.mps.application,
            part: 'ATLASMARKET'
        });
    }
}

class ApplicationDocEntityAccess extends DocEntityAccess<Application> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(
            new ApplicationDocEntityReadAccess(ddbDocClient, data),
            new ApplicationDocEntityWriteAccess(ddbDocClient, data)
        );
    }
}

export { ApplicationDocEntityAccess };
