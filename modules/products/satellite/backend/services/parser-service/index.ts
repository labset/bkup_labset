import { FeedItem } from '@labset-satellite-backend/domain-api-entity';

interface IParserService {
    parseUrl(input: { url: string }): Promise<FeedItem[]>;
}

export type { IParserService };
