import Product from "../../../models/Product.js";
import connectDB from "../../../utils/db.js";

const handler = async (req, res) => {
    await connectDB();

    const { method, query } = req;

    try {
        if (method === "GET") {
            if (query.id) {
                // Get single product by ID
                const product = await Product.findById(query.id);

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: "Product not found.",
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Product retrieved successfully.",
                    product,
                });
            } else {
                // Get all products
                const allProducts = await Product.find({});
                return res.status(200).json({
                    success: true,
                    message: "Products retrieved successfully.",
                    products: allProducts,
                });
            }
        } else if (method === "DELETE") {
            if (!query.id) {
                return res.status(400).json({
                    success: false,
                    message: "Product ID is required for deletion.",
                });
            }

            const deletedProduct = await Product.findByIdAndDelete(query.id);

            if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully.",
            });
        } else {
            res.setHeader("Allow", ["GET", "DELETE"]);
            return res.status(405).json({
                success: false,
                message: `Method ${method} not allowed.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default handler;