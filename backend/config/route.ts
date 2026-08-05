import express from "express";
import authRouter from "../routes/authRouter.js";
import configurePassport from "./passports/index.js";
import passport from "passport";

const router = express.Router();

configurePassport();
router.use(passport.initialize());

router.use(authRouter);

export default router;