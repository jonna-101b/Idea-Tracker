import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import { loginValidator, signupValidator } from "../validators/user.validator.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", signupValidator, authenticate, signupUser);
router.post("/login", loginValidator, authenticate, loginUser);

export default router;