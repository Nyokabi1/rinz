import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: String,
        email: String,
        phone: String,
    },
    { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
