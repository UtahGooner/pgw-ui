import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";
import {getPreference, setPreference} from "../../utils/preferences";

const drawerKey= 'pgw:drawer:isOpen';
const drawerBlogsKey= 'pgw:drawer:showBlogs';
const drawerSitesKey= 'pgw:drawer:showSites';

export interface DrawerState {
    isOpen: boolean;
    showBlogs: boolean;
    showSites: boolean;
}

export const defaultDrawerState: DrawerState = {
    isOpen: getPreference(drawerKey, true),
    showBlogs: getPreference(drawerBlogsKey, true),
    showSites: getPreference(drawerSitesKey, true),
}


export const setDrawerOpen = createAction<boolean>('drawer/setOpen');
export const toggleDrawerOpen = createAction('drawer/toggleOpen');
export const toggleShowBlogs = createAction('drawer/toggleShowBlogs');
export const toggleShowSites = createAction('drawer/toggleShowSites');

export const selectDrawerIsOpen = (state:RootState) => state.drawer.isOpen;
export const selectShowBlogs = (state:RootState) => state.drawer.showBlogs;
export const selectShowSites = (state:RootState) => state.drawer.showSites;

const drawerReducer = createReducer(defaultDrawerState, builder => {
    builder
        .addCase(setDrawerOpen, (state, action) => {
            state.isOpen = action.payload || false;
            setPreference(drawerKey, state.isOpen)
        })
        .addCase(toggleDrawerOpen, (state, action) => {
            state.isOpen = !state.isOpen;
            setPreference(drawerKey, state.isOpen)
        })
        .addCase(toggleShowBlogs, (state, action) => {
            state.showBlogs = !state.showBlogs;
            setPreference(drawerBlogsKey, state.showBlogs)
        })
        .addCase(toggleShowSites, (state, action) => {
            state.showSites = !state.showSites;
            setPreference(drawerSitesKey, state.showSites)
        })
})

export default drawerReducer;
