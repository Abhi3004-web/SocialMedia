import { getVerificationToken } from "../utils/tokenVerification.js"
import {
    getFeed,
    createPost,
    getUserPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    repostPost,
    sharePost
} from "../services/post.services.js";

export const getFeedController = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await getFeed({
            userId: req.user.userId,
            page,
            limit,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createPostController = async (req, res) => {
    try {
        const result = await createPost({
            authorId: req.user.userId,
            caption: req.body.caption,
            location: req.body.location,
            visibility: req.body.visibility,
            tags: req.body.tags,
            files: req.files,
            content: req.body.content
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: result,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserPostController = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await getUserPosts(userId);

        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

export const getPostByIdController = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await getPostById(postId);

        return res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

export const updatePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const updatedPost = await updatePost(
            postId,
            req.user.userId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        next(error);
    }
};

export const deletePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        await deletePost(
            postId,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const likePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await likePost(
            postId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Post liked successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

export const unlikePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await unlikePost(
            postId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

export const savePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const user = await savePost(
            postId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Post saved successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const unsavePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const user = await unsavePost(
            postId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Post unsaved successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const rePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const repost = await repostPost(
            postId,
            req.user.userId
        );

        res.status(201).json({
            success: true,
            message: "Post reposted successfully",
            data: repost,
        });
    } catch (error) {
        next(error);
    }
};

export const sharePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const result = await sharePost(postId);

        res.status(200).json({
            success: true,
            message: "Post shared successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
