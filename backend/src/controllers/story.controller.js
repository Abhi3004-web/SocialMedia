import {
  createStory,
  deleteStory,
  getActiveStories,
} from "../services/story.services.js";

export const createStoryController = async (req, res) => {
  try {
    const story = await createStory({
      userId: req.user.userId,
      file: req.file,
      caption: req.body.caption,
    });

    return res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: {
        story,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create story",
    });
  }
};

export const getStoriesController = async (req, res) => {
  try {
    const stories = await getActiveStories(req.user.userId);

    return res.status(200).json({
      success: true,
      data: {
        stories,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to load stories",
    });
  }
};

export const deleteStoryController = async (req, res) => {
  try {
    await deleteStory({
      userId: req.user.userId,
      storyId: req.params.storyId,
    });

    return res.status(200).json({
      success: true,
      message: "Story removed successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to remove story",
    });
  }
};
