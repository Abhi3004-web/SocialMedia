import mongoose from "mongoose";
const mediaSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
            default: "",
        },

        mediaType: {
            type: String,
            enum: ["IMAGE", "VIDEO"],
            required: true,
        },

    },
    {
        _id: false,
    }
);
export default mediaSchema;