import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";


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
