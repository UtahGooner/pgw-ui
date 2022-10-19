import 'isomorphic-fetch';
import {compile} from 'path-to-regexp';
import {getUserAuthToken, isTokenExpired} from './utils/auth';

fetch.credentials = 'include';

export default fetch;
export const Headers = fetch.Headers;
export const Request = fetch.Request;
export const Response = fetch.Response;

const getAuthHeader = () => {
    const token = getUserAuthToken();
    const AuthHeader = {};
    if (!!token && !isTokenExpired(token)) {
        AuthHeader.Authorization = `Bearer ${token}`;
    }
    return AuthHeader;
};

export const fetchOptions = {
    PostJSON: (object) => {
        return {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(object)
        };
    },
    Delete: () => {
        return {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        };
    }
};

const onErrorResponse = (response) => {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(`${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
    }
};

export function fetchGET(url, options = {}) {
    const fetchGETOptions = {credentials: 'same-origin', headers: {...getAuthHeader()}, ...options};
    return new Promise((resolve, reject) => {
        fetch(url, fetchGETOptions)
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    reject(new Error(response.error));
                    return console.log(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchHTML(url, options = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {credentials: 'same-origin', ...options})
            .then(onErrorResponse)
            .then(response => response.text())
            .then(html => {
                resolve(html);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchPOST(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions.PostJSON(data))
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchDELETE(url) {
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions.Delete())
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log('fetchDELETE()', err);
                reject(err);
            });
    });
}

export const cacheBuster = (url = null) => {
    const value = new Date().valueOf().toString(36);
    if (url) {
        const re = /\b(_=[0-9a-f]+)\b/gi;
        if (re.test(url)) {
            return url.replace(/\b(_=[0-9a-f]+)\b/, `_=${value}`);
        }
        return url + (/\?/.test(url) ? '&' : '?') + `_=${value}`;
    }
    return value;
};

export const buildPath = (path, props, cacheBusted = false) => {
    try {
        const url = compile(path, {encode: encodeURIComponent})(props);
        return cacheBusted ? cacheBuster(url) : url;
    } catch (e) {
        console.trace(e.message, path, props);
        return path;
    }
};
