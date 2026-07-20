export const AUTH_LOGOUT_EVENT = "auth:logout";

export const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const logoutExpiredSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));

    if (window.location.pathname !== "/") {
        window.location.assign("/");
    }
};

export const handleAuthError = <T = never>(error: unknown): Promise<T> => {
    const status = (error as { response?: { status?: number } }).response?.status;

    if (status === 401) {
        logoutExpiredSession();
    }

    return Promise.reject(error);
};
