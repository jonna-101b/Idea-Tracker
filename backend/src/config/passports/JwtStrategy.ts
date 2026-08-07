import type { Request } from "express";
import { Strategy, type StrategyOptions, ExtractJwt, type JwtFromRequestFunction } from "passport-jwt";
import { config } from "../environments.js";
import { User } from "../../models/user/userModel.js";

const cookieExtractor : JwtFromRequestFunction = (req: Request) : string | null => {
    if ( req && req.cookies ) {
        return req.cookies["accessToken"] || null;
    }

    return null;
};

const options : StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtAccessSecret
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload._id).lean().exec();

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    }
    catch (error) {
        done(error, false);
    }
});
