import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

interface IDocEntityReadAccess<TEntity extends DocEntity> {
    findBySort(input: { sort: string }): Promise<TEntity | null>;
    query(fields: Partial<TEntity>, indexName?: string): Promise<TEntity[]>;
}

export type { IDocEntityReadAccess };
