import { IMpsDocAccess } from '@labset-mps-backend/domain-api-access';
import { Application } from '@labset-mps-backend/domain-api-entity';

interface IApplicationService {
    create(input: { name: string; key: string }): Promise<Application>;
    findByKey(input: { key: string }): Promise<Application | null>;
    list(): Promise<Application[]>;
}

class ApplicationService implements IApplicationService {
    constructor(private readonly access: IMpsDocAccess) {}

    async create({
        key,
        name
    }: {
        name: string;
        key: string;
    }): Promise<Application> {
        const found = await this.access.application.reader.findBySort({
            sort: key
        });
        const entity = found ?? { key, name, createdAt: new Date(), sort: key };
        return await this.access.application.writer.save({ ...entity });
    }

    async findByKey({ key }: { key: string }): Promise<Application | null> {
        return await this.access.application.reader.findBySort({ sort: key });
    }

    async list(): Promise<Application[]> {
        return await this.access.application.reader.query({});
    }
}

export { ApplicationService };
export type { IApplicationService };
