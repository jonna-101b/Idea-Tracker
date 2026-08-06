import passport from "passport";
import { jwtStrategy } from "./JwtStrategy.js";
const configurePassport = () => {
    passport.use(jwtStrategy);
};
export default configurePassport;
//# sourceMappingURL=index.js.map