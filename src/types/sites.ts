export interface SiteProperties {
    public?: boolean;
    petroglyphs?: boolean;
    pictographs?: boolean;
    dwellings?: boolean;
}

export interface SiteHeader {
    id: number;
    path: string;
    name: string;
    location: string;
    active: boolean;
    description?: string;
    notes?: string;
    properties?: SiteProperties;
    latitude: number;
    longitude: number;
    header?: string;

}

export interface SiteList {
    [key:string]: SiteHeader;
}

export interface SiteImage {
    id: number;
    siteId: number;
    filename: string;
    description: string;
    attributes: unknown;
    parentImageId: number;
}

export interface Site extends SiteHeader {
    images: SiteImage[]
}
