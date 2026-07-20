import axios from "axios";
import { API_BASE_URL } from "@social/shared";
import { Post } from "../types/profile";
import {
    getAuthHeaders,
    handleAuthError,
} from "./authService";

const postApi = axios.create({
    baseURL: `${API_BASE_URL}/posts`,
});

export const postService = {
    async getPosts(): Promise<Post[]> {
        try {
            const response =
                await postApi.get("/feed", {
                    headers: getAuthHeaders(),
                });

            return response.data.data.posts;
        } catch (error) {
            return handleAuthError(error);
        }
    },

    async createPost(formData: FormData): Promise<Post> {
        try {
            const response =
                await postApi.post(
                    "/createPost",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            ...getAuthHeaders(),
                        },
                    }
                );

            return response.data.data;
        } catch (error) {
            return handleAuthError(error);
        }
    },

    async deletePost(id: string): Promise<void> {
        try {
            await postApi.delete(`/${id}`, {
                headers: getAuthHeaders(),
            });
        } catch (error) {
            return handleAuthError(error);
        }
    },

    async likePost(id: string): Promise<Post> {
        try {
            const response = await postApi.post(
                `/${id}/like`,
                {},
                {
                    headers: getAuthHeaders(),
                }
            );

            return response.data.data;
        } catch (error) {
            return handleAuthError(error);
        }
    },
};
