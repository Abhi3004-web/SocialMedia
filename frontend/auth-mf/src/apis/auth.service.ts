import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export interface VerifyEmailPayload {
    token: string;
}

export const login = async (payload: LoginPayload) => {
    const response = await axios.post(
        `${API_ENDPOINTS.API_URL}${API_ENDPOINTS.LOGIN}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const register = async (payload: RegisterPayload) => {
    const response = await axios.post(
        `${API_ENDPOINTS.API_URL}${API_ENDPOINTS.REGISTER}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
    const response = await axios.post(
        `${API_ENDPOINTS.API_URL}${API_ENDPOINTS.VERIFY_EMAIL}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};
