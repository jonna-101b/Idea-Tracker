import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import ideaReducer from "../features/ideas/ideaSlice";
import adminReducer from "../features/admin/adminSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    ideas: ideaReducer,
    admin: adminReducer,
});

export default rootReducer;