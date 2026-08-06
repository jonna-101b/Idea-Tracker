import { Strategy, type StrategyOptions, ExtractJwt } from "passport-jwt";
import { config } from "../environments.js";
import { User } from "../../models/user/userModel.js";

const options : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload._id).lean().exec();

        if (user) {
            done(null, user)
        }

        done(null, false);
    }
    catch (error) {
        done(error, false);
    }
});