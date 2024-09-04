import express from "express";
import formidable from 'express-formidable'
import { authenticate, authorized } from "../middlewares/authmiddlewares.js";
import { addProduct,updateProductDetails,deleteProduct,fetchProducts ,getProductById,fetchAllProducts,addProductReviews,fetchTopProduct,fetchNewProduct,filterProducts} from "../controllers/productControllers.js";
import checkId from "../middlewares/checkId.js";
const router = express.Router()


router.route('/').get(fetchProducts).post(authenticate,authorized,formidable(),addProduct)
router.route('/allproducts').get(fetchAllProducts)
router.route('/:id/reviews').post(authenticate,checkId,addProductReviews)
router.get('/top',fetchTopProduct)
router.get('/new',fetchNewProduct)
router.route('/:id').get(getProductById).put(authenticate,authorized,formidable(),updateProductDetails).delete(authenticate,authorized,deleteProduct)
router.route('/filtered-products').post(filterProducts)
export default router