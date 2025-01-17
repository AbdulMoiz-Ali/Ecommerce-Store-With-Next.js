import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Specifications, Care & Maintenance
const SpecificationSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
});

//  product reviews
const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// product detail (e.g., color, size)
const VariationSchema = new Schema({
    attribute: {
        type: String,
        required: true
    },
    options: [String],
});

// Main Product Schema
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"]

        },
        price: {
            type: Number,
            required: [true, "Product price is required"]
        },
        // Discount in percentage
        discount: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            required: [true, "Product image is required"]
        },
        // description: {
        //     type: String,
        //     required: [true, "Product description is required"]
        // },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            default: 0
        },
        delivery: {
            type: String,
            required: [true, "Delivery information is required"]
        },
        // Time when the offer ends
        offerEndTime: { type: Date },
        // product ads
        featured: {
            type: Boolean,
            default: false
        },
        //  product in top 3
        topPick: {
            type: Boolean,
            default: false
        },
        // Dynamic specifications
        description: [SpecificationSchema],
        // Key-value pairs for additional details
        additionalInfo: {
            type: Map,
            of: String
        },
        selectionMode: {
            type: String,
            enum: ["auto", "manual"],
            default: "auto", // Default auto mode
        },
        /// detail
        variations: [VariationSchema],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        reviews: [ReviewSchema], // User reviews and ratings
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User", // Seller reference
        //     required: true,
        // },
        isEnabled: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", ProductSchema);
