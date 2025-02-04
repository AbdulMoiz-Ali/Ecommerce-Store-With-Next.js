import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
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
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;