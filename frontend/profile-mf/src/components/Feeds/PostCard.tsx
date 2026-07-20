import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Card,
    IconButton,
    Typography,
} from "@mui/material";

import {
    FavoriteBorder,
    ChatBubbleOutlined,
    Send,
    BookmarkBorder,
    MoreHoriz,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { likePostThunk } from "../../redux/slices/postSlice";
import { fetchProfile } from "../../redux/slices/profileSlice"

function PostCard({ post }: any) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch])
    const profileState = useAppSelector(state => state.profile);

    const currentUserId = useAppSelector(
        state => state.profile.profile?._id
    );

    const liked = post.likes.includes(currentUserId);

    const handleLike = () => {
        dispatch(likePostThunk(post._id));
    };

    return (
        <Card
            sx={{
                borderRadius: "24px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Avatar
                        src={post.author.avatar.url}
                        sx={{
                            width: 42,
                            height: 42,
                        }}
                    />

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                        >
                            {post.author.username}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "12px",
                            }}
                        >
                            {post.content}
                        </Typography>
                    </Box>
                </Box>

                <MoreHoriz fontSize="small" />
            </Box>

            {/* Image */}
            <Box
                component="img"
                src={`http://localhost:5000/${post.media[0]?.url}`}
                alt={post.media[0]?.mediaType}
                sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                }}
            />

            {/* Actions */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 1,
                    pt: 1,
                }}
            >
                <Box>
                    <IconButton onClick={handleLike}>
                        {liked ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorder />
                        )}
                    </IconButton>

                    <IconButton size="small">
                        <ChatBubbleOutlined />
                    </IconButton>

                    <IconButton size="small">
                        <Send />
                    </IconButton>
                </Box>

                <IconButton size="small">
                    <BookmarkBorder />
                </IconButton>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, pt: 1 }}>
                <Typography
                    sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        mb: 0.5,
                    }}
                >
                    {post.likes.length} Likes
                </Typography>

                <Typography
                    sx={{
                        color: "#666",
                        fontSize: "13px",
                    }}
                >
                    {post.caption}
                </Typography>
            </Box>
        </Card>
    );
}

export default React.memo(PostCard);