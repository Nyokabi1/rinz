import express from 'express';
import opmController from '../controllers/opmController.js';

const router = express.Router();

router.get('/orders', opmController.getPendingOrders);
router.post('/process', opmController.submitPackingData);

export default router;
