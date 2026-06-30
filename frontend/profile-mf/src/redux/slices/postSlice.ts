import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { postService } from "../../services/postService";
import { Post } from "../../types/profile";

interface PostState {
    posts: Post[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    success: false,
    error: null

};


export const fetchPosts = createAsyncThunk("posts/feed", async () => {
    const response = await postService.getPosts();
    return response;
}
);

export const createPostThunk = createAsyncThunk("post/create",
    async (
        formData: FormData,
        { rejectWithValue }
    ) => {
        try {
            return await postService.createPost(formData);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(
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
            )
            // Create Post
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                // If your API returns the created post
                state.posts.unshift(action.payload);
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    },
});

export default postSlice.reducer;