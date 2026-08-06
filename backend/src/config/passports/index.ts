import passport from "passport";
import { jwtStrategy } from "./JwtStrategy.js";

const configurePassport = () : void => {
    passport.use(jwtStrategy)
};

export default configurePassport;