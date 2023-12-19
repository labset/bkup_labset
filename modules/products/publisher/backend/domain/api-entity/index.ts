import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

enum ContentStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published'
}

interface Content extends DocEntity {
    title: string;
    status: ContentStatus;
}

export type { ContentStatus, Content };
