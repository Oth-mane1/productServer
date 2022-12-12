import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;
const productSchema = new mongoose.Schema({
    reference: String,
    name: String,
    description: String,
    image: String,
    price: {
        type: Number,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100
    }
}, { timestamps: true, toJSON: { getters: true } });

export default mongoose.model('product', productSchema);