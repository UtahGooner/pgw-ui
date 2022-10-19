import {BlogEntry, BlogHeader} from "./blog";
import {SiteHeader} from "./sites";

export interface Preload {
    current?: BlogEntry,
    posts?: BlogHeader[],
    sites?: SiteHeader[]
}

export interface ManifestFiles {
    'vendors.js'?: string,
    'main.js'?: string,
    versionNo?: string,
}
