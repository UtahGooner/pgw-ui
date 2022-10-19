export interface BlogHeader {
    id: number;
    name: string;
    year: number;
    month: number;
    date: string;
    title: string;
    tags: unknown[];
    link: string;
}

export interface BlogEntry extends BlogHeader {
    author: number;
    content: string;
    excerpt: string;
    status: string;
    commentStatus: string;
    parent: number|null;
    type: string;
    commentCount: number|null;
    createdAt: string;
    updatedAt: string;
}

export interface BlogList {
    [key: string]: BlogHeader;
}

export interface HomeContentResult {
    current:BlogEntry;
    posts: BlogEntry[]
}

export interface HomeContent {
    current: BlogEntry;
    list: BlogList;
}
