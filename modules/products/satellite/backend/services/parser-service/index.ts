interface IParserService {
    parseUrl(input: { url: string }): Promise<FeedItem[]>;
}

interface FeedItem {
    link: string;
    title: string;
    description: string;
    publishedDate: Date;
}

export type { IParserService };
