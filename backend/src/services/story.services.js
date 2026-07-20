import Story from "../models/story.model.js";
import User from "../models/user.model.js";

const STORY_DURATION_MS = 24 * 60 * 60 * 1000;

const mapStory = (story, currentUser) => {
  const authorId = story.author?._id?.toString();
  const currentUserId = currentUser._id.toString();
  const isFollower = currentUser.followers.some(
    (followerId) => followerId.toString() === authorId
  );
  const isFollowing = currentUser.following.some(
    (followingId) => followingId.toString() === authorId
  );
  const relation = authorId === currentUserId
    ? "you"
    : isFollowing
      ? "following"
      : isFollower
        ? "follower"
        : "following";

  return {
    _id: story._id,
    username: story.author?.username || "User",
    imageUrl: story.media?.url || "",
    mediaType: story.media?.mediaType || "IMAGE",
    avatarUrl: story.author?.avatar?.url || "",
    relation,
    status: "live",
    lastActiveAt: story.createdAt,
    createdAt: story.createdAt,
    expiresAt: story.expiresAt,
    canDelete: authorId === currentUserId,
    caption: story.caption || "",
  };
};

export const createStory = async ({
  userId,
  file,
  caption,
}) => {
  if (!file) {
    throw new Error("Story media is required");
  }

  const mediaType = file.mimetype.startsWith("video")
    ? "VIDEO"
    : "IMAGE";

  const story = await Story.create({
    author: userId,
    caption,
    media: {
      url: file.path.replace(/\\/g, "/"),
      publicId: file.filename,
      mediaType,
    },
    expiresAt: new Date(Date.now() + STORY_DURATION_MS),
  });

  const populatedStory = await Story.findById(story._id).populate(
    "author",
    "username avatar"
  );
  const currentUser = await User.findById(userId).select(
    "following followers"
  );

  return mapStory(populatedStory, currentUser);
};

export const getActiveStories = async (userId) => {
  const currentUser = await User.findById(userId).select(
    "following followers"
  );

  if (!currentUser) {
    throw new Error("User not found");
  }

  const visibleUserIds = [
    userId,
    ...currentUser.following,
    ...currentUser.followers,
  ];

  const stories = await Story.find({
    author: {
      $in: visibleUserIds,
    },
    expiresAt: {
      $gt: new Date(),
    },
  })
    .populate("author", "username avatar")
    .sort({
      createdAt: -1,
    });

  return stories.map((story) => mapStory(story, currentUser));
};

export const deleteStory = async ({
  userId,
  storyId,
}) => {
  const story = await Story.findOne({
    _id: storyId,
    author: userId,
  });

  if (!story) {
    throw new Error("Story not found");
  }

  await story.deleteOne();
};
