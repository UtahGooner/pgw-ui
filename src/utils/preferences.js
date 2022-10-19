
export function getPreference(key, defaultValue) {
    if (typeof window === 'object' && window.localStorage) {
        const value = window.localStorage.getItem(key);
        return JSON.parse(value || defaultValue);
    }
    return defaultValue;
}

export function setPreference(key, value) {
    if (typeof window === 'object' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}