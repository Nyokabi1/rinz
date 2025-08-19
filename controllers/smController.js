import Order from '../models/Order.js';
import VerificationData from '../models/VerificationData.js';
import PackingData from '../models/PackingData.js';

const getInProgressOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'In Progress' })
            .populate('client')
            .populate('items.product');

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const submitVerificationData = async (req, res) => {
    try {
        const { orderIds, data, verifiedBy } = req.body;

        // 1. Validate matching packed and received quantities
        const mismatch = data.some(item =>
            parseInt(item.receivedQuantity, 10) !== parseInt(item.packedQuantity, 10)
        );

        if (mismatch) {
            return res.status(400).json({
                success: false,
                message: 'Mismatch found: Received and packed quantities must match for all items.'
            });
        }

        // 2. Remove previous verification entries for same order and branch
        for (const orderId of orderIds) {
            const orderItems = data.filter(d => d.orderId === orderId);
            const uniqueBranches = [...new Set(orderItems.map(item => item.branch))];

            for (const branch of uniqueBranches) {
                await VerificationData.deleteMany({ order: orderId, branch });
            }
        }

        // 3. Create new verification entries
        await Promise.all(
            data.map(d =>
                VerificationData.create({
                    order: d.orderId,
                    product: d.productId,
                    size: d.size,
                    receivedQuantity: d.receivedQuantity,
                    comment: d.comment || '',
                    verifiedBy,
                    branch: d.branch
                })
            )
        );

        // 4. Mark orders as completed
        await Promise.all(
            orderIds.map(orderId =>
                Order.findByIdAndUpdate(orderId, { status: 'Completed' })
            )
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error during verification submission: ' + err.message
        });
    }
};

const smController = {
    getInProgressOrders,
    submitVerificationData
};

export default smController;
