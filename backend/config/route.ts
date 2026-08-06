import express from "express";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";
import ideaRoutes from "../routes/idea.routes.js";
import configurePassport from "./passports/index.js";
import passport from "passport";
import { globalErrorHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

configurePassport();
router.use(passport.initialize());

router.use("/admin", userRoutes);
router.use("/auth", authRoutes);
router.use("/ideas", ideaRoutes);

router.use(globalErrorHandler);

export default router;