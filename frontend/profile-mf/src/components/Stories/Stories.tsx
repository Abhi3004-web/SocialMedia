import {
    Avatar,
    Badge,
    Box,
    Typography,
} from "@mui/material";

const stories = [
    {
        name: "Sonya",
        image: "https://i.pravatar.cc/150?img=32",
        live: true,
    },
    {
        name: "Adam",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        name: "Andrew",
        image: "https://i.pravatar.cc/150?img=14",
    },
    {
        name: "Nicole",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        name: "Ashley",
        image: "https://i.pravatar.cc/150?img=23",
    },
    {
        name: "Michael",
        image: "https://i.pravatar.cc/150?img=18",
    },
    {
        name: "Damian",
        image: "https://i.pravatar.cc/150?img=67",
    },
];

export default function Stories() {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography
                sx={{
                    fontSize: "35px",
                    fontWeight: 700,
                    color: "#111",
                    textAlign: "left",
                    mb: 1,
                }}
            >
                Stories
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    overflowX: "auto",

                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {/* Your Story */}
                <Box sx={{ textAlign: "center" }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        badgeContent={
                            <Box
                                sx={{
                                    width: 22,
                                    height: 22,
                                    bgcolor: "#1DA1F2",
                                    borderRadius: "50%",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "16px",
                                    border: "2px solid white",
                                }}
                            >
                                +
                            </Box>
                        }
                    >
                        <Avatar
                            src="https://i.pravatar.cc/150?img=11"
                            sx={{
                                width: 75,
                                height: 75,
                            }}
                        />
                    </Badge>

                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: 14,
                        }}
                    >
                        Your story
                    </Typography>
                </Box>

                {stories.map((story) => (
                    <Box
                        key={story.name}
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                p: "3px",
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg,#ff007f,#ff7a00)",
                            }}
                        >
                            <Avatar
                                src={story.image}
                                sx={{
                                    width: 75,
                                    height: 75,
                                    border: "4px solid white",
                                }}
                            />
                        </Box>

                        {story.live && (
                            <Box
                                sx={{
                                    bgcolor: "#ff0080",
                                    color: "#fff",
                                    fontSize: "10px",
                                    px: 1,
                                    borderRadius: "6px",
                                    width: "fit-content",
                                    mx: "auto",
                                    mt: -2.5,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                LIVE
                            </Box>
                        )}

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 14,
                                color: "#222",
                            }}
                        >
                            {story.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}