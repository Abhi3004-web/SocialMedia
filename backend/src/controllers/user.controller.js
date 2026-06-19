import {
  createUser,
  loginUser,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  searchUsers,
  updateProfile,
  followUser,
  unfollowUser,
  uploadAvatar,
  blockUser,
  unblockUser,
  deleteAccount,
  deactivateAccount,
  activateAccount,
  linkAccount,
  switchAccount
} from "../services/user.services.js";

const getVerificationToken = (req) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  const token =
    req.body?.token ||
    req.body?.verificationToken ||
    req.params?.token ||
    req.query?.token ||
    req.query?.verificationToken ||
    bearerToken;

  return typeof token === "string" ? decodeURIComponent(token).trim() : token;
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    const result = await createUser({
      username,
      email,
      password,
      bio,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully. Please verify your email.",
      data: {
        user: result.user,
        verificationToken: result.verificationToken,
      },
    });
  } catch (error) {
    const validationErrors = [
      "Username, email, and password are required",
      "Username must be between 3 and 30 characters",
      "Password must be at least 8 characters",
      "Email is already registered",
      "Username is already taken",
    ];
    console.error("Registration Error:", error);

    const statusCode = validationErrors.includes(error.message) ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create user",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    const statusCode =
      error.message === "Email and password are required"
        ? 400
        : error.message === "Invalid email or password"
          ? 401
          : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to login user",
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    const result = await logoutUser();

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to logout user",
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const token = getVerificationToken(req);
    const result = await verifyEmail({ token });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    const statusCode =
      error.message === "Verification token is required"
        ? 400
        : error.message === "Invalid or expired verification token"
          ? 404
          : error.message === "Email is already verified"
            ? 409
            : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to verify email",
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword({ email });

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to process request",
    });

  }
};

export const resetPasswordController = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPassword({
      token,
      password,
    });


    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to reset password",
    });

  }
};

export const currentUserController = async (req, res) => {
  try {

    const result = await getCurrentUser({
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: result,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found"
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch user",
    });
  }
};

export const searchUsersController = async (req, res) => {
  try {
    const { query } = req.query;

    const result = await searchUsers({
      query,
      currentUserId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to search users",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {

    const result = await updateProfile({
      userId: req.user.userId,
      username: req.body.username,
      bio: req.body.bio,
      avatar: req.body.avatar,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found" ||
        error.message === "Username is already taken"
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to update profile",
    });

  }
};

export const followUserController = async (req, res) => {
  try {

    const result = await followUser({
      currentUserId: req.user.userId,
      targetUserId: req.params.userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found" ||
        error.message === "You cannot follow yourself" ||
        error.message === "Already following this user"
        ? 400
        : 500;


    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to follow user",
    });
  }
};

export const unfollowUserController = async (req, res) => {
  try {
    const result = await unfollowUser({
      currentUserId: req.user.userId,
      targetUserId: req.params.userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found" ||
        error.message === "You cannot unfollow yourself" ||
        error.message === "You are not following this user"
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to unfollow user",
    });
  }
};

export const uploadAvatarController = async (req, res) => {
  try {
    const result = await uploadAvatar({
      userId: req.user.userId,
      file: req.file,
    });

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: result,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found" ||
        error.message === "Avatar file is required"
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to upload avatar",
    });
  }
};

export const blockUserController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { targetUserId } = req.params;

    const user = await blockUser(
      userId,
      targetUserId
    );

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const unblockUserController = async (req, res) => {
  try {
    const result = await unblockUser({
      currentUserId: req.user.userId,
      targetUserId: req.params.userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found" ||
        error.message === "You cannot unblock yourself" ||
        error.message === "User is not blocked"
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to unblock user",
    });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    const result = await deleteAccount({
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found"
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to delete account",
    });
  }
};

export const deactivateAccountController = async (
  req,
  res
) => {
  try {

    const result = await deactivateAccount({
      userId: req.user.userId,
      password: req.body.password,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found"
        ? 404
        : error.message === "Invalid password"
          ? 401
          : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const activateAccountController = async (
  req,
  res
) => {
  try {

    const result = await activateAccount({
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    const statusCode =
      error.message === "User not found"
        ? 404
        : error.message === "Account is already active"
          ? 400
          : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const linkAccountController = async (
  req,
  res
) => {
  try {

    const result = await linkAccount({
      currentUserId: req.user.userId,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const switchAccountController = async (
  req,
  res
) => {
  try {

    const result = await switchAccount({
      currentUserId: req.user.userId,
      targetUserId: req.body.userId,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
