import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getFeed = async ({
  userId,
  page,
  limit,
}) => {

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const authors = [
    userId,
    ...currentUser.following,
  ];

  const skip = (page - 1) * limit;

  const posts = await Post.find({
    author: {
      $in: authors,
    },
  })
    .populate(
      "author",
      "username avatar"
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const totalPosts = await Post.countDocuments({
    author: {
      $in: authors,
    },
  });

  return {
    posts,
    pagination: {
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(
        totalPosts / limit
      ),
    },
  };
};

export const createPost = async ({
  authorId,
  caption,
  location,
  visibility,
  tags,
  files,
  content
}) => {

  if (!caption && (!files || files.length === 0)) {
    throw new Error(
      "Caption or media is required"
    );
  }

  let media = [];
  if (files && files.length > 0) {
    media = files.map((file) => ({
      url: file.path.replace(/\\/g, "/"),
      publicId: "",
      mediaType:
        file.mimetype.startsWith("image")
          ? "IMAGE"
          : "VIDEO",
    }));
  }

  const post = await Post.create({
    author: authorId,
    caption,
    media,
    tags: tags || [],
    location: location || "",
    visibility:
      visibility || "PUBLIC",
    content: content || ""
  });

  // Fetch the newly created post with author populated
  const populatedPost = await Post.findById(post._id)
    .populate({
      path: "author",
      select: "_id username avatar",
    });

  return populatedPost;
};

export const getUserPosts = async (userId) => {
  const posts = await Post.find({
    author: userId,
  })
    .populate("author", "username email avatar")
    .populate("media")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username avatar",
      },
    })
    .sort({ createdAt: -1 });

  return posts;

};

export const getPostById = async (postId) => {
  const post = await Post.findById(postId)
    .populate("author", "username email avatar")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username avatar",
      },
    });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const updatePost = async (postId, userId, updateData) => {


  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Only owner can update
  if (post.author.toString() !== userId) {
    throw new Error("You are not authorized to update this post");
  }

  if (updateData.content !== undefined) {
    post.content = updateData.content;
  }

  if (updateData.media) {
    post.media = updateData.media;
  }

  await post.save();

  return await Post.findById(post._id)
    .populate("author", "username avatar")
    .populate("media");
};

export const deletePost = async (postId, userId, role) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const isOwner =
    post.author.toString() === userId;

  const isAdmin = role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new Error(
      "You are not authorized to delete this post"
    );
  }

  await Post.findByIdAndDelete(postId);

  return true;
};

export const likePost = async (postId, userId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
    }
  );

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const unlikePost = async (postId, userId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likes: userId,
      },
    },
    {
      new: true,
    }
  );

  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const savePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        savedPosts: postId,
      },
    },
    {
      new: true,
    }
  ).populate("savedPosts");

  return user;
};

export const unsavePost = async (postId, userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        savedPosts: postId,
      },
    },
    {
      new: true,
    }
  ).populate("savedPosts");

  return user;
};

export const repostPost = async (postId, userId) => {
  const originalPost = await Post.findById(postId);

  if (!originalPost) {
    throw new Error("Post not found");
  }

  const repost = await Post.create({
    author: userId,
    content: originalPost.content,
    media: originalPost.media,
    repostOf: originalPost._id,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      repostCount: 1,
    },
  });

  return repost;
};

export const sharePost = async (postId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: {
        shareCount: 1,
      },
    },
    {
      new: true,
    }
  );

  if (!post) {
    throw new Error("Post not found");
  }

  return {
    postId: post._id,
    shareCount: post.shareCount,
    shareUrl: `${process.env.Auth_URL}/posts/${post._id}`,
  };
};