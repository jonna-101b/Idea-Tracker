import passport from "passport";
import { APIError } from "../errors/APIError.js";
export const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return next(APIError.unauthorized("Unauthorized access. Invalid or missing token.", ""));
        }
        req.user = user;
        next();
    })(req, res, next);
};
//# sourceMappingURL=authenticate.js.map