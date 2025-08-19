import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const packingDataSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: String,
    packedQuantity: Number,
    branch: String, // branch for this packed item
});

export default model('PackingData', packingDataSchema);
