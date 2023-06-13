import { DynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';
import { ICoreDocAccess } from '@labset-plaform-backend-core/domain-api-access';
import {
    coreDocAccess,
    CoreDynamoDbClients
} from '@labset-plaform-backend-core/domain-dynamodb-access';
import {
    AuthIdentityService,
    IAuthIdentityService
} from '@labset-platform-backend-core/auth-identity-service';
import {
    AuthSessionService,
    IAuthSessionService
} from '@labset-platform-backend-core/auth-session-service';
import {
    ISecretService,
    SecretService
} from '@labset-platform-backend-core/secret-service';
import { SessionData } from 'express-session';

interface ICoreServices {
    authSession: IAuthSessionService<SessionData>;
    authIdentity: IAuthIdentityService;
    secret: ISecretService;
}

interface ICoreDbClients {
    dynamoDbClients: CoreDynamoDbClients;
}

interface ICoreBootstrap {
    core: {
        dbClients: ICoreDbClients;
        access: {
            doc: ICoreDocAccess<SessionData>;
        };
        services: ICoreServices;
    };
}

const coreMigrations = async ({
    runUpgrade,
    dynamoDbClientConfig
}: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<ICoreDbClients> => {
    const dynamoDbClients = new CoreDynamoDbClients(dynamoDbClientConfig);
    if (runUpgrade) {
        console.info('[labset-harness] run core dynamodb migrations');
        await dynamoDbClients.upgrade();
    }
    return { dynamoDbClients };
};

const coreBootstrap = async (options: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<ICoreBootstrap> => {
    const { dynamoDbClients } = await coreMigrations(options);
    const access = {
        doc: coreDocAccess<SessionData>(dynamoDbClients)
    };
    const services = {
        secret: new SecretService(),
        authSession: new AuthSessionService<SessionData>(access.doc),
        authIdentity: new AuthIdentityService(access.doc)
    };
    return {
        core: {
            dbClients: {
                dynamoDbClients
            },
            access,
            services
        }
    };
};

export type { ICoreServices, ICoreBootstrap };
export { coreBootstrap, coreMigrations };
