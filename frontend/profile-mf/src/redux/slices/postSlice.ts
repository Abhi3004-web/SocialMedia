import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { postService } from "../../services/postService";

import { Post } from "../../types/profile";

interface PostState {
    posts: Post[];
    loading: boolean;
}

const initialState: PostState = {
    posts: [],
    loading: false,
};

export const fetchPosts =
    createAsyncThunk(
        "posts/feed",
        async () => {
            const response = await postService.getPosts();

            return response;
        }
    );

const postSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchPosts.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                fetchPosts.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.posts = action.payload;
                }
            )

            .addCase(
                fetchPosts.rejected,
                (state) => {
                    state.loading = false;
                }
            );
    },
});

export default postSlice.reducer;