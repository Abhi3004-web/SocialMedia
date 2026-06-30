import { Box, Typography } from "@mui/material";
import PostCard from "./PostCard";
import {
    useAppDispatch,
    useAppSelector,
} from "../../redux/hooks";
import { fetchPosts } from "../../redux/slices/postSlice";
import Loader from "../Common/Loader";
import { useEffect } from "react";



export default function Feed() {

    const dispatch =
        useAppDispatch();

    const {
        posts,
        loading,
    } = useAppSelector(
        (state) => state.posts
    );

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }
    return (


        <Box sx={{ mt: 4 }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#222",
                    textAlign: "left",
                }}
            >
                Feed
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "24px",

                }}
            >
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </Box>
        </Box>
    );
}