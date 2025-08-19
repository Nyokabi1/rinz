import express from 'express';
import adminOrderController from '../controllers/adminOrderController.js';

const router = express.Router();

router.get('/', adminOrderController.getAllOrders);
router.post('/correct', adminOrderController.correctDiscrepancy);

export default router;
