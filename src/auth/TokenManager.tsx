const tokenKey = 'token';
const idKey='id';
const adminKey='isAdmin';
export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}
export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}
export function removeToken() {
    localStorage.removeItem(tokenKey);
}
export function setUserID(idValue?: string) {
    if (!idValue) return;
    localStorage.setItem(idKey, idValue);
}
export function getUserID(): string {
    return localStorage.getItem(idKey) || '';
}
export function removeID() {
    localStorage.removeItem(idKey);
}
export function verifyToken(): boolean {
    return getToken().length > 0;
}
export function getAdmin(): string {
    return localStorage.getItem(adminKey) || '';
}
export function setAdmin(adminValue?: string) {
    if (!adminValue) return;
        localStorage.setItem(adminKey, adminValue);
}
export function removeAdmin() {
    localStorage.removeItem(adminKey);
}
export function isAdmin(): boolean {
    return getAdmin()==="yes";
}
