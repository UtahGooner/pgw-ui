import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";

export interface AppState {
}

export const defaultAppState: AppState = {}
const appReducer = createReducer(defaultAppState, builder => {
})

export default appReducer;
