import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Story } from "../../types/profile";
import { storyService } from "../../services/storyService";

interface StoryState {
    stories: Story[];
    loading: boolean;
    error: string | null;
}

const initialState: StoryState = {
    stories: [],
    loading: false,
    error: null,
};

export const fetchStories = createAsyncThunk(
    "stories/fetchStories",
    async () => {
        return await storyService.getStories();
    }
);

export const createStory = createAsyncThunk(
    "stories/createStory",
    async (formData: FormData) => {
        return await storyService.createStory(formData);
    }
);

export const removeStory = createAsyncThunk(
    "stories/removeStory",
    async (storyId: string) => {
        return await storyService.deleteStory(storyId);
    }
);

const storySlice = createSlice({
    name: "stories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.loading = false;
                state.stories = action.payload;
            })
            .addCase(fetchStories.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load stories";
            })
            .addCase(createStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStory.fulfilled, (state, action) => {
                state.loading = false;
                state.stories.unshift(action.payload);
            })
            .addCase(createStory.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to create story";
            })
            .addCase(removeStory.fulfilled, (state, action) => {
                state.stories = state.stories.filter(
                    (story) => story._id !== action.payload
                );
            });
    },
});

export default storySlice.reducer;
