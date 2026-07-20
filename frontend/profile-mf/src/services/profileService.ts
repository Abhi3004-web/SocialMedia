import axios from "axios";
import { API_BASE_URL } from "@social/shared";
import { UserProfile } from "../types/profile";
import {
  getAuthHeaders,
  handleAuthError,
} from "./authService";

const profileApi = axios.create({
  baseURL: `${API_BASE_URL}/users`,
});

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const response =
        await profileApi.get("/current-user", {
          headers: getAuthHeaders(),
        });

      return response.data.data.user;
    } catch (error) {
      return handleAuthError(error);
    }
  },

  async updateProfile(
    data: Partial<UserProfile>
  ): Promise<UserProfile> {
    try {
      const response =
        await profileApi.put(
          "/profile",
          data,
          {
            headers: getAuthHeaders(),
          }
        );

      return response.data.data.user;
    } catch (error) {
      return handleAuthError(error);
    }
  },

  async uploadProfilePicture(
    formData: FormData
  ) {
    try {
      const response =
        await profileApi.post(
          "/upload",
          formData,
          {
            headers: getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      return handleAuthError(error);
    }
  },
};
