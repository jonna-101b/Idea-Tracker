import express from "express";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";
import ideaRoutes from "../routes/idea.routes.js";
import configurePassport from "./passports/index.js";
import passport from "passport";

const router = express.Router();

configurePassport();
router.use(passport.initialize());

router.use("/admin", userRoutes);
router.use("/auth", authRoutes);
router.use("/ideas", ideaRoutes);

export default router;