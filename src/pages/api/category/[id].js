import Category from "../../../models/Category.js";
import connectDB from "../../../utils/db.js";
import cloudinary from "../../../middleware/cloudinary.js";
import mongoose from "mongoose";

// Upload Image to Cloudinary
const uploadImageToCloudinary = async (imageBase64) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageBase64, {
            resource_type: "image",
        });
        return uploadResult.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

const Categories = async (req, res) => {
    await connectDB();
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Category ID is required."
        });
    }

    if (req.method === "PUT") {
        const { title, image } = req.body;

        if (!title || !image) {
            return res.status(400).json({ error: "Title and Image are required" });
        }

        try {
            const imageUrl = await uploadImageToCloudinary(image);
            if (!imageUrl) {
                return res.status(500).json({ message: "Error uploading image to Cloudinary." });
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { title, image: imageUrl },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                message: "Category updated successfully.",
                category: updatedCategory,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
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

// ✅ Increase the request size limit to allow larger image uploads
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb", // Increase limit to 10MB
        },
    },
};

export default Categories;
