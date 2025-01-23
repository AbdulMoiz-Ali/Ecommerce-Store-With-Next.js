import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to Product model
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // Reference to Product model
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);
const Order = mongoose.model('Order', OrderSchema);

export default Order;