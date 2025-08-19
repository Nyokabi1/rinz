// controllers/opmController.js

import Order from '../models/Order.js';
import PackingData from '../models/PackingData.js';

const getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ['Pending', 'In Progress'] },
        })
            .populate('client')
            .populate('items.product');

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const submitPackingData = async (req, res) => {
    try {
        const { packedBy, orders } = req.body;

        if (!packedBy || !orders || !Array.isArray(orders)) {
            return res.status(400).json({ message: 'Invalid request payload.' });
        }

        for (const order of orders) {
            const { orderId, items } = order;

            // Remove old packing data for this order
            await PackingData.deleteMany({ order: orderId });

            // Insert new packing data for each item
            await Promise.all(
                items.map((item) =>
                    PackingData.create({
                        order: orderId,
                        product: item.productId,
                        size: item.size,
                        packedQuantity: item.packedQuantity,
                        comment: item.comment || '',
                        packedBy,
                    })
                )
            );

            // Update order status
            await Order.findByIdAndUpdate(orderId, { status: 'In Progress' });
        }

        res.status(200).json({ message: 'All orders processed successfully.' });
    } catch (err) {
        console.error('Error processing packing data:', err);
        res.status(500).json({ message: 'Server error while processing packing data.' });
    }
};

const opmController = {
    getPendingOrders,
    submitPackingData,
};

export default opmController;
