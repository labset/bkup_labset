import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess,
    IDynamoDbData
} from '@labset-plaform-backend-base/domain-dynamodb-access';
import { AuthSession } from '@labset-plaform-backend-core/domain-api-entity';

import { tableNames } from './../table-names';

class AuthSessionDocEntityReadAccess<
    TSessionPayload
> extends DocEntityReadAccess<AuthSession<TSessionPayload>> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.core.authSession,
            part: 'LABSET_CORE'
        });
    }
}

class AuthSessionDocEntityWriteAccess<
    TSessionPayload
> extends DocEntityWriteAccess<AuthSession<TSessionPayload>> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(ddbDocClient, data, {
            name: tableNames.core.authSession,
            part: 'LABSET_CORE'
        });
    }
}

class AuthSessionDocEntityAccess<TSessionPayload> extends DocEntityAccess<
    AuthSession<TSessionPayload>
> {
    constructor(ddbDocClient: DynamoDBDocumentClient, data: IDynamoDbData) {
        super(
            new AuthSessionDocEntityReadAccess(ddbDocClient, data),
            new AuthSessionDocEntityWriteAccess(ddbDocClient, data)
        );
    }
}

export { AuthSessionDocEntityAccess };
