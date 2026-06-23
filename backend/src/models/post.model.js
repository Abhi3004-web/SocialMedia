import mongoose from "mongoose";
import mediaSchema from "./media.model.js"
import commentSchema from "./comment.model.js"
const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        content: {
            type: String,
            trim: true
        },

        caption: {
            type: String,
            trim: true,
            maxlength: 2200,
            default: "",
        },

        media: [mediaSchema],

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: [commentSchema],

        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        location: {
            type: String,
            trim: true,
            default: "",
        },

        visibility: {
            type: String,
            enum: ["PUBLIC", "FOLLOWERS", "PRIVATE"],
            default: "PUBLIC",
        },
        repostOf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: null,
        },

        repostCount: {
            type: Number,
            default: 0,
        },

        shareCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;