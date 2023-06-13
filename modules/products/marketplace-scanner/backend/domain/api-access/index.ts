import {
    Addon,
    AddonVersion,
    Application
} from '@labset-mps-backend/domain-api-entity';
import { IDocEntityAccess } from '@labset-plaform-backend-base/domain-api-access';

interface IMpsDocAccess {
    application: IDocEntityAccess<Application>;
    addon: (applicationKey: string) => IDocEntityAccess<Addon>;
    addonVersion: (
        applicationKey: string,
        addonKey: string
    ) => IDocEntityAccess<AddonVersion>;
}

export type { IMpsDocAccess };
