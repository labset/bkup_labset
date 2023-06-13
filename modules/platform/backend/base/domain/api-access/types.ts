import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

type SaveDocEntityInput<TEntity extends DocEntity> = Partial<
    Omit<TEntity, 'id' | 'part' | 'updatedAt' | 'removedAt'>
>;

export type { SaveDocEntityInput };
