import {
    Search,
    NotificationsNone,
    ChatBubbleOutlined,
} from "@mui/icons-material";

import {
    Box,
    IconButton,
    InputBase,
    Paper,
    Button,
} from "@mui/material";

export default function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
            }}
        >
            {/* Search */}
            <Paper
                elevation={0}
                sx={{
                    width: 380,
                    height: 50,
                    borderRadius: "25px",
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    bgcolor: "#fff",
                }}
            >
                <Search
                    sx={{
                        color: "#999",
                        mr: 1,
                    }}
                />

                <InputBase
                    placeholder="Search"
                    fullWidth
                />
            </Paper>

            {/* Actions */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <IconButton>
                    <NotificationsNone />
                </IconButton>

                <IconButton>
                    <ChatBubbleOutlined />
                </IconButton>

                <Button
                    sx={{
                        background:
                            "linear-gradient(90deg,#ff7a00,#ff0080)",
                        color: "#fff",
                        px: 4,
                        py: 1.3,
                        borderRadius: "30px",
                        textTransform: "none",
                        fontWeight: 600,

                        "&:hover": {
                            background:
                                "linear-gradient(90deg,#ff7a00,#ff0080)",
                        },
                    }}
                >
                    + Create a post
                </Button>
            </Box>
        </Box>
    );
}