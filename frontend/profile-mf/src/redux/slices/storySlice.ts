import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../../types/profile";

interface StoryState {
    stories: Story[];
}

const initialState: StoryState = {
    stories: [],
};

const storySlice = createSlice({
    name: "stories",

    initialState,

    reducers: {
        setStories: (
            state,
            action: PayloadAction<Story[]>
        ) => {
            state.stories = action.payload;
        },

        addStory: (
            state,
            action: PayloadAction<Story>
        ) => {
            state.stories.unshift(action.payload);
        },
    },
});

export const {
    setStories,
    addStory,
} = storySlice.actions;

export default storySlice.reducer;