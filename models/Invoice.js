import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const invoiceSchema = new Schema(
    {
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        issuedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Invoice = model('Invoice', invoiceSchema);

export default Invoice;
