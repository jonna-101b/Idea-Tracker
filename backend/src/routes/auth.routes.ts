import express from "express";
import { signupUser, loginUser, refreshTokenHandler, logoutUser, getUserProfile } from "../controllers/auth.controller.js";
import { loginValidator, signupValidator } from "../validators/user.validator.js";

const router = express.Router();

router.post("/signup", signupValidator, signupUser);
router.post("/login", loginValidator, loginUser);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);

export default router;