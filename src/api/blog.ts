import {URL_BLOG_CONTENT, URL_BLOG_TITLES, URL_HOME_CONTENT} from "../constants/blog";
import {fetchJSON} from "./fetch";
import {BlogEntry, BlogHeader, BlogList, HomeContent, HomeContentResult} from "../types/blog";

export async function fetchBlogContent(name:string):Promise<BlogEntry|null> {
    try {
        const url = URL_BLOG_CONTENT.replace(':name', encodeURIComponent(name));
        const {result} = await fetchJSON<{result: BlogEntry[]}>(url);
        const [post] = result;
        return post ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchBlogContent()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchBlogContent()", err);
        return Promise.reject(new Error('Error in fetchBlogContent()'));
    }
}

export async function fetchBlogTitles():Promise<BlogList> {
    try {
        const {result} = await fetchJSON<{result: BlogHeader[]}>(URL_BLOG_TITLES)
        const list:BlogList = {};
        result.forEach(entry => {
            list[entry.name] = entry;
        });
        return list;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchBlogTitles()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchBlogTitles()", err);
        return Promise.reject(new Error('Error in fetchBlogTitles()'));
    }
}

export async function fetchHomeContent():Promise<HomeContent> {
    try {
        const {result} = await fetchJSON<{result:HomeContentResult}>(URL_HOME_CONTENT);
        const {current, posts} = result;
        const list:BlogList = {};
        posts.forEach(entry => {
            list[entry.name] = entry;
        });
        return {current, list};
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchHomeContent()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchHomeContent()", err);
        return Promise.reject(new Error('Error in fetchHomeContent()'));
    }
}
