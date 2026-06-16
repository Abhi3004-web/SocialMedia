import {
  createUser,
  loginUser,
  logoutUser,
  verifyEmail,
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
