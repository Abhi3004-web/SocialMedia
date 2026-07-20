import express from "express";
import {
  createStoryController,
  deleteStoryController,
  getStoriesController,
} from "../controllers/story.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { uploadStory } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getStoriesController);
router.post("/", authenticateUser, uploadStory.single("media"), createStoryController);
router.delete("/:storyId", authenticateUser, deleteStoryController);

export default router;
