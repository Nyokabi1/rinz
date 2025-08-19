import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const sizeSchema = new Schema({
    label: String,
    unit: String,
});

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        imageUrl: String,
        sizes: [sizeSchema],
        category: { type: String, required: true },
    },
    { timestamps: true }
);

// ✅ Use existing model if it exists
export default models.Product || model('Product', productSchema);
