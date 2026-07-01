import axios from "axios";
import { API_BASE_URL } from "@social/shared";
import { UserProfile } from "../types/profile";

const profileApi = axios.create({
  baseURL: `${API_BASE_URL}/users`,
});
const token = localStorage.getItem("token");

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    const response =
      await profileApi.get("/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data.data.user;
  },

  async updateProfile(
    data: Partial<UserProfile>
  ): Promise<UserProfile> {
    const response =
      await profileApi.put(
        "/update",
        data
      );

    return response.data;
  },

  async uploadProfilePicture(
    formData: FormData
  ) {
    const response =
      await profileApi.post(
        "/upload",
        formData
      );

    return response.data;
  },
};