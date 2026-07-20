//import DashboardLayout from "../../layouts/DashboardLayout";
import {
    Home,
    Search,
    VideoLibrary,
    Settings,
    Logout,
} from "@mui/icons-material";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../components/Profiles/ProfileHeader";
import ProfileStats from "../../components/Profiles/ProfileStats";
import ProfileInfo from "../../components/Profiles/ProfileInfo";
import { useEffect, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../redux/hooks";

import {
    fetchProfile,
    updateProfile,
} from "../../redux/slices/profileSlice";
import Loader from "../../components/Common/Loader";
import { fetchPosts } from "../../redux/slices/postSlice";
import { storageService } from "../../services/storageService";
import { UserProfile } from "../../types/profile";

interface ProfileProps {
    onLogout?: () => void;
}

export default function Profile({
    onLogout,
}: ProfileProps) {
    const navigate = useNavigate();
    const dispatch =
        useAppDispatch();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        occupation: "",
        bio: "",
        location: "",
    });

    const {
        profile,
        loading,
    } = useAppSelector(
        (state) => state.profile
    );
    const { posts } = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchPosts());
    }, [dispatch]);

    const openEditProfile = () => {
        setEditForm({
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            age: profile?.age ? String(profile.age) : "",
            gender: profile?.gender || "",
            occupation: profile?.occupation || "",
            bio: profile?.bio || "",
            location: profile?.location || "",
        });
        setIsEditOpen(true);
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const payload: Partial<UserProfile> = {
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            gender: editForm.gender,
            occupation: editForm.occupation,
            bio: editForm.bio,
            location: editForm.location,
        };

        if (editForm.age) {
            payload.age = Number(editForm.age);
        }

        await dispatch(updateProfile(payload)).unwrap();
        setIsEditOpen(false);
        setIsDetailsOpen(true);
    };

    const formatDate = (date?: string) => {
        if (!date) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const displayValue = (value?: string | number) =>
        value || "Not added";

    if (loading) {
        return <Loader />;
    }

    if (!profile && !posts) {
        return null;
    }

    const handleLogout = () => {
        storageService.logout();
        onLogout?.();
        navigate("/");
    };

    return (
        // <DashboardLayout>
        <Box
            sx={{
                width: 280,
                bgcolor: "#ffffff",
                p: 2,
                borderRight: "1px solid #eee",
                height: "calc(100vh - 5px)",
                position: "sticky",
                top: "0px",
                flexShrink: 0,
                overflowY: "auto",
            }}
        >
            <Typography
                sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    mb: 2,
                    fontFamily: "cursive",
                }}
            >
                Instagram
            </Typography>
            <ProfileHeader
                profileImage={profile?.avatar?.url || ""}
                fullName={`${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()}
                username={profile?.username || "Guest"}
                onViewProfile={() => setIsDetailsOpen(true)}
                onEditProfile={openEditProfile}
            />

            <ProfileStats
                posts={posts?.length || 0}
                followers={profile?.followers || 0}
                following={profile?.following || 0}
            />

            <ProfileInfo
                bio={profile?.bio || ""}
                location={profile?.location || ""}
            />
            <Box sx={{
                mt: 2,
            }}>
                {[
                    { icon: <Home />, text: "Feed" },
                    { icon: <Search />, text: "Explore" },
                    { icon: <VideoLibrary />, text: "Reels" },
                    { icon: <Settings />, text: "Settings" },
                    {
                        icon: <Logout />,
                        text: "Logout",
                        onClick: handleLogout,
                    },
                ].map((item) => (
                    <Box
                        key={item.text}
                        onClick={item.onClick}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            py: 1,
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

            <Dialog
                open={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Profile Details</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                Full Name
                            </Typography>
                            <Typography>
                                {displayValue(
                                    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
                                )}
                            </Typography>
                        </Box>

                        <Divider />

                        {[
                            ["Age", displayValue(profile?.age)],
                            ["Gender", displayValue(profile?.gender)],
                            ["Occupation", displayValue(profile?.occupation)],
                            ["Bio", displayValue(profile?.bio)],
                            ["Location", displayValue(profile?.location)],
                            ["Account Created", formatDate(profile?.createdAt)],
                        ].map(([label, value]) => (
                            <Box key={label}>
                                <Typography variant="overline" color="text.secondary">
                                    {label}
                                </Typography>
                                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                    {value}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDetailsOpen(false)}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={openEditProfile}
                        sx={{
                            bgcolor: "#C9385F",
                            "&:hover": {
                                bgcolor: "#B12F52",
                            },
                        }}
                    >
                        Edit Profile
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <Box component="form" onSubmit={handleEditSubmit}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    value={editForm.firstName}
                                    onChange={handleEditChange}
                                    fullWidth
                                />
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={editForm.lastName}
                                    onChange={handleEditChange}
                                    fullWidth
                                />
                            </Stack>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    name="age"
                                    label="Age"
                                    type="number"
                                    value={editForm.age}
                                    onChange={handleEditChange}
                                    fullWidth
                                />
                                <TextField
                                    name="gender"
                                    label="Gender"
                                    value={editForm.gender}
                                    onChange={handleEditChange}
                                    select
                                    fullWidth
                                >
                                    {["Female", "Male", "Non-binary", "Prefer not to say"].map(
                                        (option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Stack>

                            <TextField
                                name="occupation"
                                label="Occupation"
                                value={editForm.occupation}
                                onChange={handleEditChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                label="Location"
                                value={editForm.location}
                                onChange={handleEditChange}
                                fullWidth
                            />
                            <TextField
                                name="bio"
                                label="Bio"
                                value={editForm.bio}
                                onChange={handleEditChange}
                                multiline
                                minRows={3}
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                bgcolor: "#C9385F",
                                "&:hover": {
                                    bgcolor: "#B12F52",
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
        // </DashboardLayout>
    );
}
