import jwtDecode from "jwt-decode";

export function saveUserAuthToken(token) {
    sessionStorage.setItem('auth-token', token);
}

export function clearUserAuthToken() {
    sessionStorage.removeItem('auth-token');
}

export function getUserAuthToken() {
    return sessionStorage.getItem('auth-token') || null;
}

export function getTokenExpirationDate(token) {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
        return null;
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
}

export function isTokenExpired(token) {
    const date = getTokenExpirationDate(token);
    if (date === null) {
        return false;
    }
    return !(date.valueOf() > new Date().valueOf());
}
