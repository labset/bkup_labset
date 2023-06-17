import { FeedItem, Item } from '@labset-satellite-backend/domain-api-entity';

interface IFeedItemProcessorService {
    processItem(input: {
        userId: string;
        item: FeedItem;
    }): Promise<{ matchedItems: Item[] }[]>;
}

export { IFeedItemProcessorService };
