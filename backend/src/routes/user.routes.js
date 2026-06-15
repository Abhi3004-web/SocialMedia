import express from "express";
import {
  loginUserController,
  logoutUserController,
  registerUser,
  verifyEmailController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
router.post("/verify-email", verifyEmailController);
router.post("/verify-email/:token", verifyEmailController);
router.get("/verify-email", verifyEmailController);
router.get("/verify-email/:token", verifyEmailController);

export default router;
