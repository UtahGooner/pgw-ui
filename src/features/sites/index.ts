import {Site, SiteList} from "../../types/sites";
import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchSite, fetchSites} from "../../api/sites";
import {getPreference, setPreference} from "../../utils/preferences";
import {Preload} from "../../types";
import {BlogList} from "../../types/blog";
import {RootState} from "../../app/configureStore";

export const keyImagesPerPage = 'pgw:sites:imagesPerPage';

export interface SitesState {
    list: {
        sites: SiteList;
        loading: boolean;
        loaded: boolean;
    };
    current: {
        site: Site | null;
        loading: boolean;
        loaded: boolean;
    };
    page: number;
    imagesPerPage: number;
}

export const initialSitesState: SitesState = {
    list: {
        sites: {},
        loading: false,
        loaded: false,
    },
    current: {
        site: null,
        loading: false,
        loaded: false,
    },
    page: 1,
    imagesPerPage: getPreference(keyImagesPerPage, 12),
}

export const preloadedSitesState = (state:Preload = {}):SitesState => {
    const sites: SiteList = {};
    state.sites?.forEach(site => {
        sites[site.path] = site;
    })
    return {
        ...initialSitesState,
        list: {
            sites,
            loaded: !!state.sites?.length,
            loading: false,
        }
    }
}
export const loadSites = createAsyncThunk<SiteList>(
    'sites/loadList',
    async (arg, thunkApi) => {
        return await fetchSites();
    }
)

export const loadSite = createAsyncThunk<Site, string>(
    'sites/loadSite',
    async (arg, thunkApi) => {
        return await fetchSite(arg);
    }
)

export const setImagesPerPage = createAction<number>('sites/imagesPerPage');
export const setPage = createAction<number>('sites/page');


export const selectImagesPerPage = (state:RootState) => state.sites.imagesPerPage;
export const selectPage = (state:RootState) => state.sites.page;
export const selectSites = (state:RootState) => Object.values(state.sites.list.sites);
export const selectSitesLoading = (state:RootState) => state.sites.list.loading;
export const selectSitesLoaded = (state:RootState) => state.sites.list.loaded;
export const selectCurrentSite = (state:RootState) => state.sites.current.site;
export const selectCurrentImages = (state:RootState) => state.sites.current.site?.images ?? [];
export const selectCurrentSiteLoading = (state:RootState) => state.sites.current.loading;
export const selectCurrentSiteLoaded = (state:RootState) => state.sites.current.loaded;

export const selectImagePages = createSelector(
    [selectImagesPerPage, selectCurrentImages],
    (imagesPerPage, images) => {
        return Math.floor(images.length / imagesPerPage) + 1;
    }
)
export const selectPagedImages = createSelector(
    [selectPage, selectImagesPerPage, selectCurrentImages],
    (page, imagesPerPage, images) => {
        return images.filter((img, index) => {
            return Math.floor(index / imagesPerPage) === page - 1
        })
    }
)

const sitesReducer = createReducer(initialSitesState, builder => {
    builder
        .addCase(setImagesPerPage, (state, action) => {
            setPreference(keyImagesPerPage, action.payload);
            state.imagesPerPage = action.payload;
            state.page = 1;
        })
        .addCase(setPage, (state, action) => {
            state.page = action.payload;
        })
        .addCase(loadSites.pending, (state) => {
            state.list.loading = true;
        })
        .addCase(loadSites.fulfilled, (state, action) => {
            state.list.loading = false;
            state.list.loaded = true;
            state.list.sites = action.payload;
            if (state.current.site && action.payload[state.current.site.id]) {
                state.current.site = {...state.current.site, ...action.payload[state.current.site.id]};
            }
        })
        .addCase(loadSites.rejected, (state) => {
            state.list.loading = false;
        })
        .addCase(loadSite.pending, (state, action) => {
            state.current.loading = true;
            if (state.list.sites[action.meta.arg] && state.current.site?.path !== action.meta.arg) {
                state.current.site = {...state.list.sites[action.meta.arg], images: []}
                state.page = 1;
            }
        })
        .addCase(loadSite.fulfilled, (state, action) => {
            state.current.loading = false;
            state.current.site = action.payload;
            const maxPages = Math.floor(state.current.site.images.length / state.imagesPerPage) + 1;
            if (maxPages < state.page) {
                state.page = maxPages;
            }
        })
        .addCase(loadSite.rejected, (state, action) => {
            state.current.loading = true;
        })
});

export default sitesReducer;
