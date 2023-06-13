import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Addon } from '@labset-mps-backend/domain-api-entity';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';

import { tableNames } from './../table-names';

class AddonDocEntityReadAccess extends DocEntityReadAccess<Addon> {
    constructor(
        applicationKey: string,
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(ddbDocClient, data, {
            name: tableNames.mps.addon,
            part: `ATLASMARKET:${applicationKey}`
        });
    }
}

class AddonDocEntityWriteAccess extends DocEntityWriteAccess<Addon> {
    constructor(
        applicationKey: string,
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(ddbDocClient, data, {
            name: tableNames.mps.addon,
            part: `ATLASMARKET:${applicationKey}`
        });
    }
}

class AddonDocEntityAccess extends DocEntityAccess<Addon> {
    constructor(
        namespaceKey: string,
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(
            new AddonDocEntityReadAccess(namespaceKey, ddbDocClient, data),
            new AddonDocEntityWriteAccess(namespaceKey, ddbDocClient, data)
        );
    }
}

export { AddonDocEntityAccess };
