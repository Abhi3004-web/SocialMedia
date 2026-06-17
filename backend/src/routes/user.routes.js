import express from "express";
import {
  loginUserController,
  logoutUserController,
  registerUser,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
  currentUserController,
  searchUsersController,
  updateProfileController,
  followUserController,
  unfollowUserController,
  uploadAvatarController,
  blockUserController,
  unblockUserController,
  deleteAccountController,
  deactivateAccountController,
  activateAccountController,
  linkAccountController,
  switchAccountController
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
router.post("/verify-email", verifyEmailController);
router.post("/verify-email/:token", verifyEmailController);
// Forgot Password
router.post("/forgot-password", forgotPasswordController);
// Reset Password
router.post("/reset-password/:token", resetPasswordController);
router.get("/current-user", authenticateUser, currentUserController);
router.get("/search", authenticateUser, searchUsersController);

router.put("/profile", authenticateUser, updateProfileController);

router.post("/follow/:userId", authenticateUser, followUserController);
router.post("/unfollow/:userId", authenticateUser, unfollowUserController);

router.put("/avatar", authenticateUser, upload.single("avatar"), uploadAvatarController);
router.patch("/block/:targetUserId", authenticateUser, blockUserController);
router.post("/unblock/:userId", authenticateUser, unblockUserController);
router.delete("/delete-account", authenticateUser, deleteAccountController);

router.post("/deactivate-account", authenticateUser, deactivateAccountController);
router.post("/activate-account", authenticateUser, activateAccountController);
router.post("/link-account", authenticateUser, linkAccountController);
router.post("/switch-account", authenticateUser, switchAccountController);
export default router;
