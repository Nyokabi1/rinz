import express from 'express';
import smController from '../controllers/smController.js';

const router = express.Router();

router.get('/orders', smController.getInProgressOrders);
router.post('/verify', smController.submitVerificationData);

export default router;
