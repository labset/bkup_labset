interface FeedItem {
    link: string;
    title: string;
    description: string;
    publishedDate: Date;
}

interface Item extends FeedItem {
    id: string;
}

export type { FeedItem, Item };
