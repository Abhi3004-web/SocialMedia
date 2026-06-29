import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./slices/profileSlice";
import postReducer from "./slices/postSlice";
import storyReducer from "./slices/storySlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        posts: postReducer,
        stories: storyReducer,
    },
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;