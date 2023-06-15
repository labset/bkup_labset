import { AddonService, IAddonService } from '@labset-mps-backend/addon-service';
import {
    ApplicationService,
    IApplicationService
} from '@labset-mps-backend/application-service';
import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import {
    mpsDocAccess,
    MpsDynamoDbClients
} from '@labset-mps-backend/domain-dynamodb-access';
import { DynamoDbClientConfig } from '@labset-plaform-backend-base/domain-dynamodb-access';

interface IMpsDbClients {
    dynamoDbClients: MpsDynamoDbClients;
}

interface IMpsServices {
    application: IApplicationService;
    addon: IAddonService;
}

interface IMpsBootstrap {
    mps: {
        dbClients: IMpsDbClients;
        access: {
            doc: IMpsDocAccess;
        };
        services: IMpsServices;
    };
}

const mpsMigrations = async ({
    runUpgrade,
    dynamoDbClientConfig
}: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IMpsDbClients> => {
    const dynamoDbClients = new MpsDynamoDbClients(dynamoDbClientConfig);
    if (runUpgrade) {
        console.info('[labset-harness] run mps dynamodb migrations');
        await dynamoDbClients.upgrade();
    }
    return { dynamoDbClients };
};

const mpsBootstrap = async (options: {
    runUpgrade: boolean;
    dynamoDbClientConfig: DynamoDbClientConfig;
}): Promise<IMpsBootstrap> => {
    const { dynamoDbClients } = await mpsMigrations(options);
    const access = {
        doc: mpsDocAccess(dynamoDbClients)
    };
    const services = {
        application: new ApplicationService(access.doc),
        addon: new AddonService(access.doc)
    };
    return {
        mps: {
            dbClients: {
                dynamoDbClients
            },
            access,
            services
        }
    };
};

export type { IMpsBootstrap, IMpsServices };
export { mpsMigrations, mpsBootstrap };
