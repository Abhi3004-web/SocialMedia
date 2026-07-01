import axios from "axios";
import { API_BASE_URL } from "@social/shared";
import { Post } from "../types/profile";

const postApi = axios.create({
    baseURL: `${API_BASE_URL}/posts`,
});
const token = localStorage.getItem("token");

export const postService = {
    async getPosts(): Promise<Post[]> {
        const response =
            await postApi.get("/feed", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data.data.posts;
    },

    async createPost(formData: FormData): Promise<Post> {
        const response =
            await postApi.post("/createPost",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            },
            );

        return response.data.data;
    },

    async deletePost(id: string): Promise<void> {
        await postApi.delete(`/${id}`);
    },

    async likePost(id: string): Promise<Post> {
        const response = await postApi.post(`/${id}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    },
};