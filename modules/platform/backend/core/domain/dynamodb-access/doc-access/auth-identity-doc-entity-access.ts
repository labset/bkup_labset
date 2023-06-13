import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';
import { AuthIdentity } from '@labset-plaform-backend-core/domain-api-entity';

import { tableNames } from './../table-names';

class AuthIdentityDocEntityReadAccess extends DocEntityReadAccess<AuthIdentity> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.core.authIdentity,
            part: 'LABSET_CORE'
        });
    }
}

class AuthIdentityDocEntityWriteAccess extends DocEntityWriteAccess<AuthIdentity> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.core.authIdentity,
            part: 'LABSET_CORE'
        });
    }
}

class AuthIdentityDocEntityAccess extends DocEntityAccess<AuthIdentity> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(
            new AuthIdentityDocEntityReadAccess(ddbDocClient, data),
            new AuthIdentityDocEntityWriteAccess(ddbDocClient, data)
        );
    }
}

export { AuthIdentityDocEntityAccess };
