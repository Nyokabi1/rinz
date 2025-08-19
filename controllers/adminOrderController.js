// controllers/adminOrderController.js

import Order from '../models/Order.js';
import PackingData from '../models/PackingData.js';
import VerificationData from '../models/VerificationData.js';
import Invoice from '../models/Invoice.js';

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('client')
            .populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
};

const correctDiscrepancy = async (req, res) => {
    try {
        const { orderId, corrections } = req.body;
        // corrections: array of {productId, newPackedQuantity, newReceivedQuantity}

        for (const c of corrections) {
            await PackingData.updateOne(
                { order: orderId, product: c.productId },
                { packedQuantity: c.newPackedQuantity }
            );

            await VerificationData.updateOne(
                { order: orderId, product: c.productId },
                { receivedQuantity: c.newReceivedQuantity }
            );
        }

        await Order.findByIdAndUpdate(orderId, { status: 'Completed' });
        await Invoice.create({ order: orderId });

        res.json({ message: 'Discrepancy corrected and invoice generated.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to correct discrepancy.' });
    }
};

const adminOrderController = {
    getAllOrders,
    correctDiscrepancy
};

export default adminOrderController;
