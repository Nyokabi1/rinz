import Order from '../models/Order.js';

const createOrder = async (req, res) => {
    try {
        const { clientId, branches } = req.body;

        if (!clientId || !Array.isArray(branches) || branches.length === 0) {
            return res.status(400).json({ message: 'Missing clientId or branches data.' });
        }

        // Validate each branch entry
        for (const branch of branches) {
            if (!branch.branch || !Array.isArray(branch.items) || branch.items.length === 0) {
                return res.status(400).json({ message: `Invalid branch data: ${JSON.stringify(branch)}` });
            }
        }

        // Create one order per branch
        const createdOrders = await Promise.all(branches.map(async (branch) => {
            const newOrder = new Order({
                client: clientId,
                branch: branch.branch,
                items: branch.items.map(item => ({
                    ...item,
                    branch: branch.branch,
                })),

                status: 'Pending',
            });

            return await newOrder.save();
        }));

        res.status(201).json({
            message: 'Orders created successfully.',
            orders: createdOrders,
        });
    } catch (err) {
        console.error('Error creating multi-branch order:', err);
        res.status(500).json({ message: 'Server error while creating orders.' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('client')
            .populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const orderController = {
    createOrder,
    getOrders,
};

export default orderController;
