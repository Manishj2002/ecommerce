import express from "express";
import { authenticate, authorized } from "../middlewares/authmiddlewares.js";
import { createCategory ,updateCategory,removeCategory,listCategories,readCategory} from "../controllers/categoryControllers.js";
const router = express.Router()

router.route('/').post(authenticate,authorized,createCategory)
router.route('/:categoryId').put(authenticate,authorized,updateCategory)
router.route('/:categoryId').delete(authenticate,authorized,removeCategory)
router.route('/categories').get(listCategories)
router.route('/:id').get(readCategory)

export default router;