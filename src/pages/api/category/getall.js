import connectDB from "../../../utils/db.js";
import Category from "../../../models/Category.js";

const getCategories = async (req, res) => {
    await connectDB();
    try {
        const allCategories = await Category.find({});
        console.log(allCategories)
        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully.",
            categories: allCategories, // ✅ Fix: Change `products` to `categories`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default getCategories;   