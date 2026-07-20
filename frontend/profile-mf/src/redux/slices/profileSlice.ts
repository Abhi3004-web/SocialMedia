import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { profileService } from "../../services/profileService";
import { UserProfile } from "../../types/profile";

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile =
  createAsyncThunk(
    "profile/fetchProfile",
    async () => {
      return await profileService.getProfile();
    }
  );

export const updateProfile =
  createAsyncThunk(
    "profile/updateProfile",
    async (data: Partial<UserProfile>) => {
      return await profileService.updateProfile(data);
    }
  );

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProfile.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )

      .addCase(
        fetchProfile.rejected,
        (state) => {
          state.loading = false;
          state.error =
            "Failed to load profile";
        }
      )

      .addCase(
        updateProfile.pending,
        (state) => {
          state.error = null;
        }
      )

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          state.profile = action.payload;
        }
      )

      .addCase(
        updateProfile.rejected,
        (state) => {
          state.error =
            "Failed to update profile";
        }
      );
  },
});

export default profileSlice.reducer;
