import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Sub-schema for product specifications
const SpecificationSchema = new Schema({
    heading: { type: String, required: true }, // Example: Specifications, Care & Maintenance
    details: { type: String, required: true }, // Example: Content under the heading
});

// Sub-schema for product reviews
const ReviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Sub-schema for product variations (e.g., color, size)
const VariationSchema = new Schema({
    attribute: { type: String, required: true }, // Example: Color, Storage
    options: [String], // Example: ['Red', 'Blue'] or ['128GB', '256GB']
});

// Main Product Schema
const ProductSchema = new Schema(
    {
        name: { type: String, required: [true, "Product name is required"] },
        price: { type: Number, required: [true, "Product price is required"] },
        discount: { type: Number, default: 0 }, // Discount in percentage
        image: { type: String, required: [true, "Product image is required"] },
        description: { type: String, required: [true, "Product description is required"] },
        stock: { type: Number, required: [true, "Stock quantity is required"], default: 0 },
        delivery: { type: String, required: [true, "Delivery information is required"] },
        specifications: [SpecificationSchema], // Dynamic specifications
        additionalInfo: { type: Map, of: String }, // Key-value pairs for additional details
        variations: [VariationSchema], // For options like color, size
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", // Reference to Category model
            required: true,
        },
        reviews: [ReviewSchema], // User reviews and ratings
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Seller reference
            required: true,
        },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order", // Orders containing this product
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

export default mongoose.model("Product", ProductSchema);