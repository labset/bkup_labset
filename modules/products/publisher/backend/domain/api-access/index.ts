import { IDocEntityAccess } from '@labset-plaform-backend-base/domain-api-access';
import { Content } from '@labset-publisher-backend/domain-api-entity';

interface IPublisherDocAccess {
    content: IDocEntityAccess<Content>;
}

export type { IPublisherDocAccess };
