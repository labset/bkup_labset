import { Addon, Application } from '@labset-mps-backend/domain-api-entity';

interface AddonModel {
    application: Application;
    addon: Addon;
}

export type { AddonModel };
