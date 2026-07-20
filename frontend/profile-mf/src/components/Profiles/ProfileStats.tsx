// src/components/Profile/ProfileStats.tsx
import {
    Box,
    Divider,
    Typography,
} from "@mui/material";

interface ProfileStatsProps {
    posts: number;
    followers: number | string[];
    following: number | string[];
}


export default function ProfileStats({
    posts,
    followers,
    following,
}: ProfileStatsProps) {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    textAlign: "center",
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                        {posts}
                    </Typography>

                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Posts
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2 }}
                />
                <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                        {Array.isArray(followers) ? followers.length : followers}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Followers
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2 }}
                />
                <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                        {Array.isArray(following) ? following.length : following}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Following
                    </Typography>
                </Box>
            </Box>
        </>
    );
}