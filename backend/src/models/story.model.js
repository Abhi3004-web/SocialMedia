import mongoose from "mongoose";
import mediaSchema from "./media.model.js";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    media: {
      type: mediaSchema,
      required: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Story = mongoose.models.Story || mongoose.model("Story", storySchema);

export default Story;
