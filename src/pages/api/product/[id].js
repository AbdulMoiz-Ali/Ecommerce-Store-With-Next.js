import Product from "../../../models/Product";
import connectDB from "../../../utils/db";
import cloudinary from "../../../middleware/cloudinary.js";
import nextConnect from "next-connect";
import { upload } from "../../../middleware/multer.js";

// Function to upload image to Cloudinary and return the URL
const uploadImageToCloudinary = async (localPath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
        });

        return uploadResult.url;  // Return the URL of the uploaded image
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

const updateProduct = nextConnect();

updateProduct.use(upload.single('image'));  // Use the Multer middleware to handle the image upload

updateProduct.put(async (req, res) => {
    await connectDB();

    try {
        const { id } = req.query; // Get the product ID from the query
        const updateData = req.body; // Get the fields to update from the request body

        if (!req.file) {
            return res.status(400).json({ error: "Product should have an image" });
        }

        const imageUrl = await uploadImageToCloudinary(req.file.path);

        if (!imageUrl) {
            return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
        }

        // Ensure the product ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required for updating.",
            });
        }

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, { updateData, imageUrl }, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // Respond with the updated product
        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default updateProduct;