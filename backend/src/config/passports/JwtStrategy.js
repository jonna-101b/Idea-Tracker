import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../environments.js";
import { User } from "../../models/user/userModel.js";
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
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
//# sourceMappingURL=JwtStrategy.js.map