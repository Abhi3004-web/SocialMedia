
import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PublicIcon from "@mui/icons-material/Public";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createPostThunk } from "../../redux/slices/postSlice";



interface Tag {
    id: number;
    name: string;
}

interface CreatePostProps {
    open: boolean;
    onClose: () => void;
}

export default function CreatePost({
    open,
    onClose,
}: CreatePostProps) {
    const dispatch = useDispatch<AppDispatch>();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [caption, setCaption] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [visibility, setVisibility] = useState("PUBLIC");

    const [tagInput, setTagInput] = useState("");

    const [tags, setTags] = useState<Tag[]>([]);

    const [media, setMedia] = useState<File[]>([]);

    const [loading, setLoading] = useState(false);

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        setMedia((prev) => [...prev, ...files]);
    };

    const handleVideoUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        setMedia((prev) => [...prev, ...files]);
    };

    const removeMedia = (index: number) => {
        setMedia((prev) => prev.filter((_, i) => i !== index));
    };

    const addTag = () => {
        if (!tagInput.trim()) return;

        setTags((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: tagInput,
            },
        ]);

        setTagInput("");
    };

    const removeTag = (id: number) => {
        setTags((prev) => prev.filter((x) => x.id !== id));
    };

    const handlePost = async () => {
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("content", content);
            formData.append("location", location);
            formData.append("visibility", visibility);

            tags.forEach((tag) => {
                formData.append("tags", tag.name);
            });

            media.forEach((file) => {
                formData.append("media", file);
            });
            await dispatch(
                createPostThunk(formData)
            ).unwrap();
            // dispatch(createPostThunk(formData))

            onClose();
            setCaption("");
            setContent("");
            setLocation("");
            setMedia([]);
            setTags([]);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = Array.from(e.dataTransfer.files);

        setMedia((prev) => [...prev, ...droppedFiles]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };



    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#C9385F",
                    color: "#fff"
                }}
            >
                Create Post

                <IconButton onClick={onClose}
                    sx={{
                        color: "#fff"
                    }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Card
                    sx={{
                        maxWidth: 750,
                        mx: "auto",
                        mt: 3,
                        borderRadius: 4,
                        boxShadow: "0 8px 30px rgba(0,0,0,.08)",
                    }}
                >
                    <CardContent>

                        <Stack sx={{
                            direction: "row",
                            spacing: 2,
                            alignItems: "center"
                        }}>
                            <Avatar
                                sx={{
                                    width: 55,
                                    height: 55,
                                }}
                            />

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{
                                    fontWeight: 700,
                                    fontSize: 18
                                }}

                                >
                                    Abhijit Ranjan
                                </Typography>

                                <FormControl
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    <Select
                                        value={visibility}
                                        onChange={(e) =>
                                            setVisibility(e.target.value)
                                        }
                                    >
                                        <MenuItem value="PUBLIC">
                                            <PublicIcon
                                                sx={{
                                                    mr: 1,
                                                }}
                                            />
                                            Public
                                        </MenuItem>

                                        <MenuItem value="PRIVATE">
                                            Private
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            label="Caption"
                            value={caption}
                            onChange={(e) =>
                                setCaption(e.target.value)
                            }
                        />

                        <TextField
                            fullWidth
                            multiline
                            minRows={5}
                            sx={{ mt: 3 }}
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                        />

                        <Grid
                            container
                            spacing={2}
                            sx={{ mt: 1 }}
                        >
                            <Grid sx={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid sx={{ xs: 12, md: 6 }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                >
                                    <TextField
                                        fullWidth
                                        label="Tag"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Button
                                        variant="contained"
                                        onClick={addTag}
                                        sx={{ backgroundColor: "#C9385F" }}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Stack sx={{
                            direction: "row",
                            spacing: 1,
                            mt: 2,
                            flexWrap: "wrap"
                        }}>
                            {tags.map((tag) => (
                                <Chip
                                    key={tag.id}
                                    icon={<LocalOfferIcon />}
                                    label={tag.name}
                                    onDelete={() =>
                                        removeTag(tag.id)
                                    }
                                />
                            ))}
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Button
                                variant="contained"
                                startIcon={<ImageIcon />}
                                onClick={() => imageInputRef.current?.click()}
                                sx={{
                                    backgroundColor: "#C9385F",
                                    color: "#fff",
                                    border: "1px solid #C9385F",
                                    "& .MuiButton-startIcon": {
                                        color: "#fff",
                                    },
                                    "&:hover": {
                                        backgroundColor: "#B12F54",
                                        border: "1px solid #C9385F",
                                    },
                                }}
                            >
                                Images
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <VideoLibraryIcon />
                                }
                                onClick={() =>
                                    videoInputRef.current?.click()
                                }
                                sx={{
                                    backgroundColor: "#C9385F",
                                    color: "#fff",
                                    border: "1px solid #C9385F",
                                    "& .MuiButton-startIcon": {
                                        color: "#fff",
                                    },
                                    "&:hover": {
                                        backgroundColor: "#B12F54",
                                        border: "1px solid #C9385F",
                                    },
                                }}
                            >
                                Videos
                            </Button>

                            <input
                                hidden
                                multiple
                                accept="image/*"
                                type="file"
                                ref={imageInputRef}
                                onChange={handleImageUpload}
                            />

                            <input
                                hidden
                                multiple
                                accept="video/*"
                                type="file"
                                ref={videoInputRef}
                                onChange={handleVideoUpload}
                            />
                        </Stack>

                        {/* Media Preview will come in Part 1B */}

                        <Divider sx={{ my: 3 }} />

                        <Stack sx={{
                            direction: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}

                        >
                            <Typography
                                color="text.secondary"
                            >
                                {caption.length +
                                    content.length}
                                /1000
                            </Typography>

                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                disabled={loading}
                                onClick={handlePost}
                                sx={{
                                    backgroundColor: "#C9385F",
                                    color: "#fff",
                                    border: "1px solid #C9385F",
                                    "& .MuiButton-startIcon": {
                                        color: "#fff",
                                    },
                                    "&:hover": {
                                        backgroundColor: "#B12F54",
                                        border: "1px solid #C9385F",
                                    },
                                }}
                            >
                                {loading
                                    ? "Posting..."
                                    : "Create Post"}
                            </Button>
                        </Stack>
                        <Box sx={{ mt: 4 }}>

                            <Paper
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                sx={{
                                    border: "2px dashed #C9385F",
                                    borderRadius: 3,
                                    p: 4,
                                    textAlign: "center",
                                    bgcolor: "#fafafa",
                                    transition: ".3s",
                                    cursor: "pointer",

                                    "&:hover": {
                                        bgcolor: "#f5f5f5",
                                        borderColor: "#B12F54",
                                    },
                                }}
                            >
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "#C9385F",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        mt: 1,
                                        fontWeight: 600
                                    }}
                                >
                                    Drag & Drop Images or Videos
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 14
                                    }}
                                >
                                    or click Image / Video buttons above
                                </Typography>

                            </Paper>

                            {
                                media.length > 0 && (

                                    <Grid
                                        container
                                        sx={{
                                            spacing: 2,
                                            mt: 2
                                        }}
                                    >

                                        {
                                            media.map((file, index) => {

                                                const url = URL.createObjectURL(file);

                                                const isImage =
                                                    file.type.startsWith("image");

                                                return (

                                                    <Grid
                                                        sx={{
                                                            xs: 12,
                                                            sm: 6,
                                                            md: 4,
                                                            key: index
                                                        }}

                                                    >

                                                        <Card
                                                            sx={{
                                                                position: "relative",
                                                                borderRadius: 3,
                                                                overflow: "hidden",
                                                            }}
                                                        >

                                                            <IconButton
                                                                onClick={() =>
                                                                    removeMedia(index)
                                                                }
                                                                sx={{
                                                                    position: "absolute",
                                                                    top: 8,
                                                                    right: 8,
                                                                    bgcolor: "white",
                                                                    zIndex: 5,

                                                                    "&:hover": {
                                                                        bgcolor: "#eee",
                                                                    },
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>

                                                            {
                                                                isImage ? (

                                                                    <Box
                                                                        component="img"
                                                                        src={url}
                                                                        sx={{
                                                                            width: "100%",
                                                                            height: 220,
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />

                                                                ) : (

                                                                    <video
                                                                        controls
                                                                        width="100%"
                                                                        style={{
                                                                            height: 220,
                                                                            objectFit: "cover",
                                                                        }}
                                                                    >
                                                                        <source src={url} />
                                                                    </video>

                                                                )
                                                            }

                                                            <Box
                                                                sx={{ p: 1.5 }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    noWrap
                                                                >
                                                                    {file.name}
                                                                </Typography>

                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                >
                                                                    {(
                                                                        file.size /
                                                                        1024 /
                                                                        1024
                                                                    ).toFixed(2)} MB
                                                                </Typography>

                                                            </Box>

                                                        </Card>

                                                    </Grid>

                                                );
                                            })
                                        }

                                    </Grid>

                                )
                            }

                        </Box>

                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}
                    sx={{
                        backgroundColor: "#C9385F",
                        color: "#fff",
                        border: "1px solid #C9385F",
                        "& .MuiButton-startIcon": {
                            color: "#fff",
                        },
                        "&:hover": {
                            backgroundColor: "#B12F54",
                            border: "1px solid #C9385F",
                        },
                    }}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handlePost}
                    disabled={loading}
                    sx={{
                        backgroundColor: "#C9385F",
                        color: "#fff",
                        border: "1px solid #C9385F",
                        "& .MuiButton-startIcon": {
                            color: "#fff",
                        },
                        "&:hover": {
                            backgroundColor: "#B12F54",
                            border: "1px solid #C9385F",
                        },
                    }}
                >
                    {loading ? "Posting..." : "Post"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}