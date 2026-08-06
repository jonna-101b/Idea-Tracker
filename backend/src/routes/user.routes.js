import express from "express";
import { signupUser, loginUser } from "../controllers/auth.controller.js";
import { authenticate } from '../middlewares/authenticate.js';
import { restrictTo } from '../middlewares/authorize.js';
import { signupValidator, loginValidator } from '../validators/user.validator.js';
import { updateUserValidation, userIdParamValidation } from '../validators/adminUser.validator.js';
import { getUsers, getUser, updateUser, deleteUser, } from '../controllers/user.controller.js';
const router = express.Router();
router.post('/signup', signupValidator, signupUser);
router.post('/login', loginValidator, loginUser);
// Admin Only Routes - Protected by JWT & Restricted to 'admin'
router.use(authenticate);
router.use(restrictTo('admin'));
router.get('/', getUsers);
router
    .route('/:id')
    .get(userIdParamValidation, getUser)
    .put(updateUserValidation, updateUser)
    .delete(userIdParamValidation, deleteUser);
export default router;
//# sourceMappingURL=user.routes.js.map