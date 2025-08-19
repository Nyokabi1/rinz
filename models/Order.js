import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: String, required: true }, // e.g., 1L, 5L
    quantityOrdered: { type: Number, required: true },
    branch: { type: String, required: true } // branch for this item
});

const orderSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        items: {
            type: [orderItemSchema],
            validate: (v) => Array.isArray(v) && v.length > 0, // At least one item
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Discrepancy', 'Completed'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

export default model('Order', orderSchema);
