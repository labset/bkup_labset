import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import { Addon } from '@labset-mps-backend/domain-api-entity';
import { AddonModel } from '@labset-mps-backend/domain-api-model';

interface IAddonService {
    findByKey(input: {
        applicationKey: string;
        addonKey: string;
    }): Promise<AddonModel | null>;
    create(input: {
        name: string;
        addonKey: string;
        applicationKey: string;
    }): Promise<Addon>;
    list(input: { applicationKey: string }): Promise<Addon[]>;
}

class AddonService implements IAddonService {
    constructor(private readonly access: IMpsDocAccess) {}

    async findByKey(input: {
        applicationKey: string;
        addonKey: string;
    }): Promise<AddonModel | null> {
        const application = await this.access.application.reader.findBySort({
            sort: input.applicationKey
        });
        if (application === null) return null;
        const found = await this.access
            .addon(application.key)
            .reader.findBySort({ sort: input.addonKey });
        if (found === null) return null;
        return { addon: found, application };
    }

    async create({
        name,
        addonKey,
        applicationKey
    }: {
        name: string;
        addonKey: string;
        applicationKey: string;
    }): Promise<Addon> {
        const addonAccess = this.access.addon(applicationKey);
        const found = await addonAccess.reader.findBySort({
            sort: addonKey
        });
        const entity = found ?? {
            name,
            key: addonKey,
            applicationKey: applicationKey,
            createdAt: new Date(),
            sort: addonKey
        };
        return await addonAccess.writer.save({
            ...entity
        });
    }

    async list(input: { applicationKey: string }): Promise<Addon[]> {
        return await this.access.addon(input.applicationKey).reader.query({});
    }
}

export { IAddonService, AddonService };
