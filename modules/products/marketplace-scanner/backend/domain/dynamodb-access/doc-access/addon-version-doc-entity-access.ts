import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { AddonVersion } from '@labset-mps-backend/domain-api-entity';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';

import { tableNames } from './../table-names';

class AddonVersionDocEntityReadAccess extends DocEntityReadAccess<AddonVersion> {
    constructor(
        {
            applicationKey,
            addonKey
        }: { applicationKey: string; addonKey: string },
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(ddbDocClient, data, {
            name: tableNames.mps.addonVersion,
            part: `ATLASMARKET:${applicationKey}:${addonKey}`
        });
    }
}

class AddonVersionDocEntityWriteAccess extends DocEntityWriteAccess<AddonVersion> {
    constructor(
        {
            applicationKey,
            addonKey
        }: { applicationKey: string; addonKey: string },
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(ddbDocClient, data, {
            name: tableNames.mps.addonVersion,
            part: `ATLASMARKET:${applicationKey}:${addonKey}`
        });
    }
}

class AddonVersionDocEntityAccess extends DocEntityAccess<AddonVersion> {
    constructor(
        parent: { applicationKey: string; addonKey: string },
        ddbDocClient: DynamoDBDocumentClient,
        data: IDynamoDbData
    ) {
        super(
            new AddonVersionDocEntityReadAccess(parent, ddbDocClient, data),
            new AddonVersionDocEntityWriteAccess(parent, ddbDocClient, data)
        );
    }
}

export { AddonVersionDocEntityAccess };
