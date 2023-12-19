import {
    DynamoDbClientConfig,
    DynamoDbClients
} from '@labset-plaform-backend-base/domain-dynamodb-access';

import migrations from './migrations';

class PublisherDynamoDbClients extends DynamoDbClients {
    constructor(options: DynamoDbClientConfig) {
        super(migrations, options);
    }
}

export { PublisherDynamoDbClients };
