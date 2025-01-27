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
        Payment: {
            type: String,
            required: [true, "Payment Method is required"],
        },
        Shipping: {
            type: String,
            required: [true, "Shipping Method is required"],
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);
const Order = mongoose.model('Order', OrderSchema);

export default Order;