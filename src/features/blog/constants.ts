import {BlogEntry} from "../../types/blog";

const now = new Date();
export const defaultBlogEntry:BlogEntry = {
    id: 0,
    name: '',
    author: 2,
    date: now.toISOString(),
    content: '',
    title: '',
    excerpt: '',
    status: 'loading',
    commentStatus: '',
    parent: null,
    type: 'post',
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    tags: [],
    commentCount: 0,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    link: '',
}
