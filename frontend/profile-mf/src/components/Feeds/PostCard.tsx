import React from "react";
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

function PostCard({ post }: any) {
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
                    <IconButton size="small">
                        <FavoriteBorder />
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
                    Liked by Andrew and 360 others
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