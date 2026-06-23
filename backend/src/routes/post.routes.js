import express from 'express';
import {
    getFeedController,
    createPostController,
    getUserPostController,
    getPostByIdController,
    updatePostController,
    deletePostController,
    likePostController,
    unlikePostController,
    savePostController,
    unsavePostController,
    rePostController,
    sharePostController
} from "../controllers/post.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { uploadPost } from "../middleware/upload.middleware.js";

const router = express.Router();
router.post("/createPost", authenticateUser, uploadPost.array("media", 10), createPostController);
router.get("/feed", authenticateUser, getFeedController);
router.get("/user/:userId", getUserPostController);
router.get("/getPost/:postId", getPostByIdController);
router.put("/:postId", authenticateUser, updatePostController);
router.delete("/:postId", authenticateUser, deletePostController);
router.post("/:postId/like", authenticateUser, likePostController);
router.post("/:postId/unlike", authenticateUser, unlikePostController);
router.post("/:postId/save", authenticateUser, savePostController);
router.post("/:postId/unsave", authenticateUser, unsavePostController);
router.post("/:postId/repost", authenticateUser, rePostController);

router.post("/:postId/share", authenticateUser, sharePostController);

export default router;