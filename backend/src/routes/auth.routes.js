import express from "express";
import { signupUser, loginUser } from "../controllers/auth.controller.js";
import { loginValidator, signupValidator } from "../validators/user.validator.js";
const router = express.Router();
router.post("/signup", signupValidator, signupUser);
router.post("/login", loginValidator, loginUser);
export default router;
//# sourceMappingURL=auth.routes.js.map