import { STORAGE_KEYS } from "@social/shared";
export const storageService = {
    saveToken(token: string) {
        localStorage.setItem(
            STORAGE_KEYS.TOKEN,
            token
        );
    },

    getToken() {
        return localStorage.getItem(
            STORAGE_KEYS.TOKEN
        );
    },

    removeToken() {
        localStorage.removeItem(
            STORAGE_KEYS.TOKEN
        );
    },

    saveUser(user: unknown) {
        localStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify(user)
        );
    },

    getUser() {
        const user = localStorage.getItem(
            STORAGE_KEYS.USER
        );

        return user ? user : null;
    },

    logout() {
        localStorage.clear();
    },
};