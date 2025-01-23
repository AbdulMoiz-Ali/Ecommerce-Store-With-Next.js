import connectDB from "../../../utils/db.js";
import Category from "../../../models/Category.js";

const getCatagories = async (req, res) => {
    await connectDB();
    if (req.method === "GET") {
        try {
            // Execute the query and retrieve all products
            const allProducts = await Category.find({});

            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully.",
                products: allProducts, // Properly return the product list
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else {
        res.status(405).json({
            success: false,
            message: "Method not allowed.",
        });
    }
};

export default getCatagories;