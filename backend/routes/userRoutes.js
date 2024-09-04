import express from "express";
import { createUser,loginUser,logoutUser,getAllUsers,getCurrentUserProfile ,updateCurrntUserProfile,deleteUser,getUserById,updateUserById} from "../controllers/userControllers.js";
import { authenticate, authorized } from "../middlewares/authmiddlewares.js";

const router = express.Router()

router.route('/').post(createUser).get(authenticate,authorized,getAllUsers)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrntUserProfile)
router.route('/:id').delete(authenticate,authorized,deleteUser).get(authenticate,authorized,getUserById).put(authenticate,authorized,updateUserById)
export default router;

