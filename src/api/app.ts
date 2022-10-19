import {URL_API_PRELOAD} from "../constants/app";
import {fetchJSON} from "./fetch";
import {Preload} from "../types";

export async function fetchPreload():Promise<Preload> {
    try {
        return await fetchJSON<Preload>(URL_API_PRELOAD);
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchPreload()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchPreload()", err);
        return Promise.reject(new Error('Error in fetchPreload()'));
    }
}
