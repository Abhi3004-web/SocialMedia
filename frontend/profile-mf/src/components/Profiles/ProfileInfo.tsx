// src/components/Profile/ProfileInfo.tsx
import {
    Box,
    Link,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ProfileInfoProps {
    bio: string;
    location: string;
}

export default function ProfileInfo({
    bio,
    location,
}: ProfileInfoProps) {
    return (
        <Box
            sx={{
                py: {
                    xs: 2,
                    sm: 2,
                },
                px: {
                    xs: 1,
                    sm: 0,
                },
            }}
        >

            <Typography
                variant="body1"
                color="text.primary"
                sx={{
                    mt: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: {
                        xs: "0.85rem",
                        sm: "0.85rem",
                    },
                }}
            >
                {bio || "No bio available"}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    color: "text.secondary",
                    flexWrap: "wrap",
                    gap: 0.5,
                }}
            >
                <LocationOnIcon fontSize="small" />

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: {
                            xs: "0.85rem",
                            sm: "0.9rem",
                        },
                        wordBreak: "break-word",
                    }}
                >
                    {location || "Location not provided"}
                </Typography>
            </Box>

            {/* {website && (
    <Link
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      sx={{
        mt: 2,
        display: "inline-block",
        fontSize: {
          xs: "0.9rem",
          sm: "1rem",
        },
        wordBreak: "break-all",
      }}
    >
      {website}
    </Link>
  )} */}
        </Box>
    );
}