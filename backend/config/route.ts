import express from "express";
import authRouter from "../routes/auth.routes.js";
import ideaRouter from "../routes/idea.routes.js";
import configurePassport from "./passports/index.js";
import passport from "passport";

const router = express.Router();

configurePassport();
router.use(passport.initialize());

router.use(authRouter);
router.use(ideaRouter);

export default router;