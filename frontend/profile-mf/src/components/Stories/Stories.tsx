import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Avatar,
    Badge,
    Box,
    ButtonBase,
    Chip,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../redux/hooks";
import {
    createStory,
    fetchStories,
    removeStory,
} from "../../redux/slices/storySlice";
import { Story } from "../../types/profile";

const API_ORIGIN = "http://localhost:5000";

const statusRank = {
    live: 0,
    online: 1,
    recent: 2,
    offline: 3,
};

const getMediaUrl = (url?: string) => {
    if (!url) {
        return "";
    }

    if (url.startsWith("http") || url.startsWith("blob:")) {
        return url;
    }

    return `${API_ORIGIN}/${url.replace(/\\/g, "/")}`;
};

const getStatus = (story: Story): NonNullable<Story["status"]> => {
    if (story.status) {
        return story.status;
    }

    if (!story.lastActiveAt) {
        return "offline";
    }

    const minutesAgo =
        (Date.now() - new Date(story.lastActiveAt).getTime()) / 60000;

    if (minutesAgo <= 5) {
        return "online";
    }

    if (minutesAgo <= 180) {
        return "recent";
    }

    return "offline";
};

const getTimeLabel = (date?: string) => {
    if (!date) {
        return "offline";
    }

    const minutesAgo = Math.max(
        0,
        Math.floor((Date.now() - new Date(date).getTime()) / 60000)
    );

    if (minutesAgo < 1) {
        return "now";
    }

    if (minutesAgo < 60) {
        return `${minutesAgo}m`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo}h`;
};

const getStatusColor = (status: NonNullable<Story["status"]>) => {
    if (status === "live") {
        return "#ff007f";
    }

    if (status === "online") {
        return "#20bf6b";
    }

    if (status === "recent") {
        return "#f5a623";
    }

    return "#98a2b3";
};

export default function Stories() {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        stories: savedStories,
        loading,
    } = useAppSelector((state) => state.stories);
    const profile = useAppSelector((state) => state.profile.profile);

    useEffect(() => {
        dispatch(fetchStories());
    }, [dispatch]);

    const stories = useMemo(() => {
        return [...savedStories]
            .filter((story) => !story.expiresAt || new Date(story.expiresAt) > new Date())
            .sort((first, second) => {
                const firstStatus = getStatus(first);
                const secondStatus = getStatus(second);

                if (statusRank[firstStatus] !== statusRank[secondStatus]) {
                    return statusRank[firstStatus] - statusRank[secondStatus];
                }

                return (
                    new Date(second.lastActiveAt || second.createdAt || 0).getTime() -
                    new Date(first.lastActiveAt || first.createdAt || 0).getTime()
                );
            });
    }, [savedStories]);

    const handleAddStory = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files?.[0];

        if (!files) {
            return;
        }

        const formData = new FormData();
        formData.append("media", files);

        return dispatch(createStory(formData)).unwrap();



        event.target.value = "";
    };

    const profileAvatar = getMediaUrl(profile?.avatar?.url) ||
        "https://i.pravatar.cc/150?img=11";

    const myStory = stories.find(
        story => story._id === profile?._id
    );
    const myAvatar = myStory
        ? getMediaUrl(myStory.imageUrl)
        : profileAvatar;


    return (
        <Box sx={{ mt: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "35px",
                        fontWeight: 700,
                        color: "#111",
                        textAlign: "left",
                    }}
                >
                    Stories
                </Typography>

                <Chip
                    label="24 hours"
                    size="small"
                    sx={{
                        bgcolor: "#fff",
                        border: "1px solid #eee",
                        color: "#555",
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 3,
                    overflowX: "auto",
                    pb: 1,

                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Box sx={{ textAlign: "center", width: 86, flex: "0 0 auto" }}>
                    <ButtonBase
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ borderRadius: "50%" }}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        bgcolor: "#1DA1F2",
                                        borderRadius: "50%",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid white",
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={14} sx={{ color: "#fff" }} />
                                    ) : (
                                        <AddIcon sx={{ fontSize: 17 }} />
                                    )}
                                </Box>
                            }
                        >
                            <Avatar
                                src={myAvatar}
                                sx={{
                                    width: 75,
                                    height: 75,
                                }}
                            />
                        </Badge>
                    </ButtonBase>

                    <Typography sx={{ mt: 1, fontSize: 14 }}>
                        Add story
                    </Typography>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        hidden
                        onChange={handleAddStory}
                    />
                </Box>

                {stories.map((story) => {
                    const status = getStatus(story);
                    const statusColor = getStatusColor(status);
                    const avatarUrl = getMediaUrl(story.avatarUrl) || getMediaUrl(story.imageUrl);

                    return (
                        <Box
                            key={story._id}
                            sx={{
                                textAlign: "center",
                                width: 86,
                                flex: "0 0 auto",
                                position: "relative",
                            }}
                        >
                            {story.canDelete && (
                                <IconButton
                                    size="small"
                                    onClick={() => dispatch(removeStory(story._id))}
                                    sx={{
                                        position: "absolute",
                                        top: -8,
                                        right: -6,
                                        zIndex: 2,
                                        width: 24,
                                        height: 24,
                                        bgcolor: "#fff",
                                        border: "1px solid #eee",
                                        "&:hover": {
                                            bgcolor: "#f9fafb",
                                        },
                                    }}
                                >
                                    <DeleteIcon sx={{ fontSize: 14, color: "#C9385F" }} />
                                </IconButton>
                            )}

                            <Box
                                sx={{
                                    p: "3px",
                                    borderRadius: "50%",
                                    background:
                                        status === "offline"
                                            ? "#d0d5dd"
                                            : "linear-gradient(135deg,#ff007f,#ff7a00)",
                                }}
                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    badgeContent={
                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: "50%",
                                                bgcolor: statusColor,
                                                border: "2px solid white",
                                            }}
                                        />
                                    }
                                >
                                    <Avatar
                                        src={avatarUrl}
                                        sx={{
                                            width: 75,
                                            height: 75,
                                            border: "4px solid white",
                                        }}
                                    />
                                </Badge>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: statusColor,
                                    color: "#fff",
                                    fontSize: "10px",
                                    px: 1,
                                    borderRadius: "6px",
                                    width: "fit-content",
                                    mx: "auto",
                                    mt: -2.5,
                                    position: "relative",
                                    zIndex: 1,
                                    textTransform: "uppercase",
                                }}
                            >
                                {status === "live" ? "LIVE" : getTimeLabel(story.lastActiveAt)}
                            </Box>

                            <Typography
                                sx={{
                                    mt: 1,
                                    fontSize: 14,
                                    color: "#222",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {story.username}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: "#667085",
                                    textTransform: "capitalize",
                                }}
                            >
                                {story.relation || "following"}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
