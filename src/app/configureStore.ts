import {combineReducers, PreloadedState} from 'redux';
import {configureStore} from "@reduxjs/toolkit";
import appReducer from "../features/app";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import drawerReducer from "../features/drawer";
import blogReducer, {preloadedBlogState} from "../features/blog";
import {Preload} from "../types";
import sitesReducer, {preloadedSitesState} from "../features/sites";

const rootReducer = combineReducers({
    app: appReducer,
    blog: blogReducer,
    drawer: drawerReducer,
    sites: sitesReducer,
});

declare global {
    interface Window {
        __PRELOADED_STATE__: PreloadedState<Preload>;
    }
}

let preloadedState = {
    blog: preloadedBlogState(window.__PRELOADED_STATE__),
    sites: preloadedSitesState(window.__PRELOADED_STATE__),
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
    preloadedState
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
