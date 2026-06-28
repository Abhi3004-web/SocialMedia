import {
    Home,
    Search,
    VideoLibrary,
    Settings,
    Logout,
} from "@mui/icons-material";

import {
    Avatar,
    Box,
    Divider,
    Typography,
} from "@mui/material";

export default function Sidebar() {
    return (
        <Box
            sx={{
                width: 280,
                bgcolor: "#ffffff",
                p: 2,
                borderRight: "1px solid #eee",
                height: "calc(100vh - 64px)",
                position: "sticky",
                top: "64px",
                flexShrink: 0,
                overflowY: "auto",
            }}
        >
            <Typography
                sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    mb: 5,
                    fontFamily: "cursive",
                }}
            >
                Instagram
            </Typography>

            <Box sx={{
                textAlign: "center",
            }}>
                <Avatar
                    src="https://i.pravatar.cc/150"
                    sx={{
                        width: 90,
                        height: 90,
                        mx: "auto",
                    }}
                />

                <Typography sx={{ mt: 2, fontWeight: 700 }}>
                    Abhinav Khare
                </Typography>

                <Typography sx={{ color: "gray", fontSize: 13 }}>
                    @abhi_navkhare
                </Typography>
            </Box>

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
                        472
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
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
                        12.4K
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
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
                        228
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                        Following
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                mt: 6,
            }}>
                {[
                    { icon: <Home />, text: "Feed" },
                    { icon: <Search />, text: "Explore" },
                    { icon: <VideoLibrary />, text: "Reels" },
                    { icon: <Settings />, text: "Settings" },
                    { icon: <Logout />, text: "Logout" },
                ].map((item) => (
                    <Box
                        key={item.text}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            py: 1.2,
                            cursor: "pointer",
                            borderRadius: 2,
                            px: 2,
                            "&:hover": {
                                bgcolor: "#f2f2f2",
                            },
                        }}
                    >
                        {item.icon}
                        <Typography sx={{ fontSize: 15 }}>
                            {item.text}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}