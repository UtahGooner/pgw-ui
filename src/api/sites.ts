import {Site, SiteHeader, SiteList} from "../types/sites";
import {fetchJSON} from "./fetch";
import {URL_API_SITE, URL_API_SITES} from "../constants/sites";

export async function fetchSites(): Promise<SiteList> {
    try {
        const {sites} = await fetchJSON<{ sites: SiteHeader[] }>(URL_API_SITES);
        const list: SiteList = {};
        sites.forEach(site => {
            list[site.path] = site;
        });
        return list;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchSites()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSites()", err);
        return Promise.reject(new Error('Error in fetchSites()'));
    }
}

export async function fetchSite(path: string): Promise<Site> {
    try {
        const url = URL_API_SITE.replace(':site', encodeURIComponent(path));
        const {site} = await fetchJSON<{site:Site}>(url);
        return site;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchSite()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSite()", err);
        return Promise.reject(new Error('Error in fetchSite()'));
    }
}

export async function saveSite(_site:SiteHeader):Promise<SiteHeader> {
    try {
        // @TODO: Make sure this really works, it's only a placeholder
        const url = URL_API_SITE.replace(':site', encodeURIComponent(_site.path));
        const {site} = await fetchJSON<{site:SiteHeader}>(url);
        return site;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchSite()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSite()", err);
        return Promise.reject(new Error('Error in fetchSite()'));
    }
}
