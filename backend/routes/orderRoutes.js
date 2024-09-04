import express from "express";
import { authenticate, authorized } from "../middlewares/authmiddlewares.js";
import { createOrder,getAllOrders,getUserOrders,countTotalOrders,calculateTotalSales,calculateTotalSalesByDate,getOrderById,markOrderAsPaid,markOrderAsDelivery } from "../controllers/orderControllers.js";
const router = express.Router()

router.route('/').post(authenticate,createOrder).get(authenticate,authorized,getAllOrders)
router.route('/mine').get(authenticate,getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calculateTotalSalesByDate)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(authenticate,markOrderAsPaid)
router.route('/:id/deilver').put(authenticate,authorized,markOrderAsDelivery)
export default router