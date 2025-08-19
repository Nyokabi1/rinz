import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const verificationDataSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: String,
    receivedQuantity: Number,
    comment: String,
    verifiedBy: String, // SM name/ID
    branch: String, // branch for this verification entry
  },
  { timestamps: true }
);

export default model('VerificationData', verificationDataSchema);
