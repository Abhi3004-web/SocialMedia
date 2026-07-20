// src/components/Profile/ProfileHeader.tsx
import {
    Avatar,
    Box,
    Button,
    Typography,
} from "@mui/material";

interface ProfileHeaderProps {
    profileImage: string;
    fullName: string;
    username: string;
    onEditProfile?: () => void;
    onViewProfile?: () => void;
}

export default function ProfileHeader({
    profileImage,
    fullName,
    username,
    onEditProfile,
    onViewProfile,
}: ProfileHeaderProps) {
    const imageUrl = profileImage
        ? `http://localhost:5000/${profileImage.replace(/\\/g, "/")}`
        : "";
    return (
        <Box sx={{
            textAlign: "center",
        }}>
            <Avatar
                src={imageUrl}
                alt={username}
                onClick={onViewProfile}
                sx={{
                    mx: "auto",
                    width: 90,
                    height: 90,
                    border: "2px solid",
                    borderColor: "#C9385F", // Your app's theme color
                    cursor: "pointer",
                }}
            />

            <Box>
                <Typography sx={{ mt: 1, fontWeight: 700 }}>
                    {fullName}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 13 }}>
                    {username}
                </Typography>

                <Button
                    variant="contained"
                    onClick={onEditProfile}
                    sx={{
                        mt: 1,
                        bgcolor: "#C9385F",
                        "&:hover": {
                            bgcolor: "#B12F52",
                        },
                    }}
                >
                    Edit Profile
                </Button>
            </Box>
        </Box>
    );
}
