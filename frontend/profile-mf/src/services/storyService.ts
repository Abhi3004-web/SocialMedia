import axios from "axios";
import { API_BASE_URL } from "@social/shared";
import { Story } from "../types/profile";
import {
    getAuthHeaders,
    handleAuthError,
} from "./authService";

const storyApi = axios.create({
    baseURL: `${API_BASE_URL}/stories`,
});

export const storyService = {
    async getStories(): Promise<Story[]> {
        try {
            const response = await storyApi.get("/", {
                headers: getAuthHeaders(),
            });

            return response.data.data.stories;
        } catch (error) {
            return handleAuthError(error);
        }
    },

    async createStory(formData: FormData): Promise<Story> {
        try {
            const response = await storyApi.post(
                "/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        ...getAuthHeaders(),
                    },
                }
            );

            return response.data.data.story;
        } catch (error) {
            return handleAuthError(error);
        }
    },

    async deleteStory(storyId: string): Promise<string> {
        try {
            await storyApi.delete(`/${storyId}`, {
                headers: getAuthHeaders(),
            });

            return storyId;
        } catch (error) {
            return handleAuthError(error);
        }
    },
};
