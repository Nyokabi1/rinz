import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);

export default router;
