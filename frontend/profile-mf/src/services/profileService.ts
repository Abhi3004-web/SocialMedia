import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { UserProfile } from "../types/profile";

const profileApi = axios.create({
  baseURL: `${API_BASE_URL}/profile`,
});

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    const response =
      await profileApi.get("/me");

    return response.data;
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