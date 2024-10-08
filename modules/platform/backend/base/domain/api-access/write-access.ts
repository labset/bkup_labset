import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

import { SaveDocEntityInput } from './types';

interface IDocEntityWriteAccess<TEntity extends DocEntity> {
    save(input: SaveDocEntityInput<TEntity>): Promise<TEntity>;
    remove(entity: Pick<TEntity, 'sort'>): Promise<void>;
    saveMultiple(entities: SaveDocEntityInput<TEntity>[]): Promise<TEntity[]>;
}

export type { IDocEntityWriteAccess };
