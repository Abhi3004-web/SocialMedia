import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";


const sanitizeUser = (user) => {
  const safeUser = user.toObject ? user.toObject() : { ...user };
  delete safeUser.password;
  delete safeUser.verificationToken;
  delete safeUser.resetPasswordToken;
  return safeUser;
};

export const createUser = async ({ username, email, password, bio = "" }) => {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
    throw new Error("Username must be between 3 and 30 characters");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
  });

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      throw new Error("Email is already registered");
    }

    throw new Error("Username is already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    bio,
    verificationToken,
  });

  await sendVerificationEmail(user.email, verificationToken);

  return {
    user: sanitizeUser(user),
    verificationToken,
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT access secret is not configured");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    },
  );

  return {
    user: sanitizeUser(user),
    token,
  };
};

export const logoutUser = async () => {
  return {
    message: "Logout successful",
  };
};

export const verifyEmail = async ({ token }) => {
  if (!token) {
    throw new Error("Verification token is required");
  }

  const normalizedToken = token.trim();
  const user = await User.findOne({ verificationToken: normalizedToken });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  user.isVerified = true;
  user.verificationToken = null;

  await user.save();

  return {
    user: sanitizeUser(user),
  };
};

export const forgotPassword = async ({ email }) => {

  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  await user.save();

  // Send email
  const resetLink =
    `http://localhost:5000/api/users/reset-password/${resetToken}`;

  await sendResetPasswordEmail(
    user.email,
    resetLink
  );

  return {
    message:
      "Password reset link sent successfully",
  };
};

export const resetPassword = async ({
  token,
  password,
}) => {


  if (!token) {
    throw new Error("Reset token is required");
  }


  if (!password || password.length < 8) {
    throw new Error(
      "Password must be at least 8 characters"
    );
  }


  const user = await User.findOne({
    resetPasswordToken: token,
  });


  if (!user) {
    throw new Error(
      "Invalid or expired reset token"
    );
  }


  const hashedPassword =
    await bcrypt.hash(password, 12);


  user.password = hashedPassword;


  // Remove token after successful reset
  user.resetPasswordToken = null;


  await user.save();


  return {
    message:
      "Password reset successfully",
  };

};

export const getCurrentUser = async ({ userId }) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(userId)
    .select("-password -verificationToken -resetPasswordToken");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user,
  };
};

export const searchUsers = async ({
  query,
  currentUserId,
}) => {

  if (!query || query.trim().length === 0) {
    throw new Error("Search query is required");
  }


  const users = await User.find({
    _id: {
      $ne: currentUserId, // exclude logged-in user
    },

    $or: [
      {
        username: {
          $regex: query,
          $options: "i",
        },
      },
      {
        bio: {
          $regex: query,
          $options: "i",
        },
      },
      {
        email: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  })
    .select(
      "-password -verificationToken -resetPasswordToken"
    )
    .limit(20);


  return {
    users,
    count: users.length,
  };
};

export const updateProfile = async ({
  userId,
  username,
  firstName,
  lastName,
  age,
  gender,
  occupation,
  bio,
  location,
  avatar,
}) => {

  if (!userId) {
    throw new Error("User ID is required");
  }


  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }


  // Check username uniqueness
  if (username && username !== user.username) {

    const existingUser = await User.findOne({
      username: username.trim(),
    });

    if (existingUser) {
      throw new Error("Username is already taken");
    }

    user.username = username.trim();
  }


  // Update optional fields
  if (firstName !== undefined) {
    user.firstName = firstName.trim();
  }

  if (lastName !== undefined) {
    user.lastName = lastName.trim();
  }

  if (age !== undefined) {
    user.age = age === "" ? undefined : Number(age);
  }

  if (gender !== undefined) {
    user.gender = gender.trim();
  }

  if (occupation !== undefined) {
    user.occupation = occupation.trim();
  }

  if (bio !== undefined) {
    user.bio = bio.trim();
  }

  if (location !== undefined) {
    user.location = location.trim();
  }


  if (avatar !== undefined) {
    user.avatar = avatar;
  }


  await user.save();


  // Remove sensitive data
  const updatedUser = user.toObject();

  delete updatedUser.password;
  delete updatedUser.verificationToken;
  delete updatedUser.resetPasswordToken;


  return {
    user: updatedUser,
  };
};

export const followUser = async ({
  currentUserId,
  targetUserId,
}) => {

  if (!currentUserId || !targetUserId) {
    throw new Error("User ID is required");
  }


  // Prevent self-follow
  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }


  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);


  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }


  // Check already following
  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    throw new Error("Already following this user");
  }


  // Update following list
  currentUser.following.push(targetUser._id);


  // Update followers list
  targetUser.followers.push(currentUser._id);


  await currentUser.save();
  await targetUser.save();


  return {
    message: "User followed successfully",
    data: {
      followingCount: currentUser.following.length,
      followersCount: targetUser.followers.length,
    },
  };

};

export const unfollowUser = async ({
  currentUserId,
  targetUserId,
}) => {

  if (!currentUserId || !targetUserId) {
    throw new Error("User ID is required");
  }


  // Prevent self-unfollow
  if (currentUserId === targetUserId) {
    throw new Error("You cannot unfollow yourself");
  }


  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);


  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }


  const isFollowing = currentUser.following.includes(targetUserId);

  if (!isFollowing) {
    throw new Error("You are not following this user");
  }


  // Remove target user from following
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId
  );


  // Remove current user from followers
  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId
  );


  await currentUser.save();
  await targetUser.save();


  return {
    message: "User unfollowed successfully",
    data: {
      followingCount: currentUser.following.length,
      followersCount: targetUser.followers.length,
    },
  };
};

export const uploadAvatar = async ({
  userId,
  file,
}) => {

  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!file) {
    throw new Error("Avatar file is required");
  }
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Example: Local storage path
  // For Cloudinary, replace this with cloudinary URL
  const avatarUrl = file.path;
  user.avatar = {
    url: file.path,
    publicId: "",
  };
  await user.save();

  return {
    user: sanitizeUser(user),
  };
};

export const blockUser = async (userId, targetUserId) => {
  if (userId === targetUserId) {
    throw new Error("You cannot block yourself");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  const alreadyBlocked = user.blockedUsers.includes(targetUserId);

  if (alreadyBlocked) {
    throw new Error("User already blocked");
  }

  user.blockedUsers.push(targetUserId);

  // Optional: remove from followers/following
  user.followers.pull(targetUserId);
  user.following.pull(targetUserId);

  targetUser.followers.pull(userId);
  targetUser.following.pull(userId);

  await user.save();
  await targetUser.save();

  return user;
};

export const unblockUser = async ({
  currentUserId,
  targetUserId,
}) => {

  if (!currentUserId || !targetUserId) {
    throw new Error("User ID is required");
  }

  if (currentUserId === targetUserId) {
    throw new Error("You cannot unblock yourself");
  }

  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    throw new Error("User not found");
  }

  const isBlocked = currentUser.blockedUsers.some(
    (id) => id.toString() === targetUserId
  );

  if (!isBlocked) {
    throw new Error("User is not blocked");
  }

  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== targetUserId
  );

  await currentUser.save();

  return {
    message: "User unblocked successfully",
    data: {
      blockedUsersCount: currentUser.blockedUsers.length,
    },
  };
};

export const deleteAccount = async ({ userId }) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Remove this user from followers/following lists
  await User.updateMany(
    {
      followers: userId,
    },
    {
      $pull: {
        followers: userId,
      },
    }
  );

  await User.updateMany(
    {
      following: userId,
    },
    {
      $pull: {
        following: userId,
      },
    }
  );

  // Delete user
  await User.findByIdAndDelete(userId);

  return {
    message: "Account deleted successfully",
  };
};

export const deactivateAccount = async ({
  userId,
  password,
}) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(userId)
    .select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActive) {
    throw new Error(
      "Your account has been deactivated"
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  user.isActive = false;

  await user.save();

  return {
    message: "Account deactivated successfully",
  };
};

export const activateAccount = async ({
  userId,
}) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isActive) {
    throw new Error("Account is already active");
  }

  user.isActive = true;

  await user.save();

  return {
    message: "Account activated successfully",
  };
};

export const linkAccount = async ({
  currentUserId,
  email,
  password,
}) => {

  const currentUser =
    await User.findById(currentUserId);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const targetUser = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!targetUser) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      targetUser.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  if (
    currentUser._id.toString() ===
    targetUser._id.toString()
  ) {
    throw new Error(
      "Cannot link same account"
    );
  }

  const alreadyLinked =
    currentUser.linkedAccounts.some(
      (id) =>
        id.toString() ===
        targetUser._id.toString()
    );

  if (alreadyLinked) {
    throw new Error(
      "Account already linked"
    );
  }

  currentUser.linkedAccounts.push(
    targetUser._id
  );

  await currentUser.save();

  return {
    message: "Account linked successfully",
    data: {
      linkedAccountId:
        targetUser._id,
      username:
        targetUser.username,
    },
  };
};

export const switchAccount = async ({
  currentUserId,
  targetUserId,
}) => {
 
  const currentUser = await User.findById(
    currentUserId
  );

  if (!currentUser) {
    throw new Error("User not found");
  }
  
  const isLinked =
    currentUser.linkedAccounts.some(
      (id) => id.toString() === targetUserId
    );
  
  if (!isLinked) {
    throw new Error(
      "Account is not linked"
    );
  }

  const targetUser = await User.findById(
    targetUserId
  );

  if (!targetUser) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      userId: targetUser._id,
      email: targetUser.email,
      role: targetUser.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

  return {
    user: sanitizeUser(targetUser),
    token,
  };
};
