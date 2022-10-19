import {BlogEntry, BlogList, HomeContent} from "../../types/blog";
import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchBlogContent, fetchBlogTitles, fetchHomeContent} from "../../api/blog";
import {RootState} from "../../app/configureStore";
import {defaultBlogEntry} from "./constants";
import {Preload} from "../../types";

export interface BlogState {
    home: BlogEntry | null;
    posts: BlogList;
    entry: BlogEntry | null;
    loading: boolean;
    loaded:boolean;
}

export const initialBlogState: BlogState = {
    home: null,
    posts: {},
    entry: null,
    loading: false,
    loaded: false,
}

export const preloadedBlogState = (state: Preload = {}): BlogState => {
    const posts: BlogList = {};
    state.posts?.forEach(post => {
        posts[post.name] = post;
    })
    return {
        ...initialBlogState,
        home: state.current ?? null,
        posts,
        entry: state.current ?? null,
        loading: false,
        loaded: !!state.current,
    }
}
export const loadBlog = createAsyncThunk<BlogEntry | null, string>(
    'blog/loadPost',
    async (arg, thunkApi) => {
        return await fetchBlogContent(arg);
    }
)

export const loadTitles = createAsyncThunk<BlogList>(
    'blog/loadTitles',
    async (arg, thunkApi) => {
        return await fetchBlogTitles();
    }
)

export const loadHomeContent = createAsyncThunk<HomeContent>(
    'blog/loadHomeContent',
    async (arg, thunkApi) => {
        return await fetchHomeContent();
    }
);

export const selectCurrentPost = (state: RootState) => state.blog.entry;
export const selectBlogList = (state: RootState) => Object.values(state.blog.posts);
export const selectHomeContent = (state: RootState) => state.blog.home;
export const selectBlogLoading = (state: RootState) => state.blog.loading;
export const selectBlogLoaded = (state: RootState) => state.blog.loaded;

const blogReducer = createReducer(initialBlogState, builder => {
    builder
        .addCase(loadBlog.pending, (state, action) => {
            const blog = state.posts[action.meta.arg] ?? null;
            if (!!blog && blog?.id !== state.entry?.id) {
                state.entry = {...defaultBlogEntry, ...blog};
            }
            state.loading = true;
        })
        .addCase(loadBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.entry = action.payload;
            if (action.payload) {
                state.posts[action.payload.name] = action.payload;
            } else {
                delete state.posts[action.meta.arg];
            }
        })
        .addCase(loadBlog.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadTitles.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadTitles.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.loaded = true;
        })
        .addCase(loadTitles.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadHomeContent.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadHomeContent.fulfilled, (state, action) => {
            state.entry = action.payload.current;
            state.home = action.payload.current;
            state.posts = action.payload.list;
            state.posts[action.payload.current.name] = action.payload.current;
            state.loading = false;
            state.loaded = true;
        })
        .addCase(loadHomeContent.rejected, (state, action) => {
            state.loading = false;
        })
});

export default blogReducer;
