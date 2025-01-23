import Category from "../../../models/Category.js";
import connectDB from "../../../utils/db.js";
import cloudinary from "../../../middleware/cloudinary.js"
import mongoose from "mongoose";

// Function to upload image to Cloudinary and return the URL


const uploadImageToCloudinary = async (localPath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
        });
        return uploadResult.url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};



const Catagories = async (req, res) => {
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

        const { title } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Category should have an image" });
        }

        try {

            const imageUrl = await uploadImageToCloudinary(req.file.path);

            if (!imageUrl) {
                return res.status(500).json({ message: "Error uploading image to Cloudinary." });
            }
            const newCategory = await Category.findByIdAndUpdate(id, { title, imageUrl }, { new: true, runValidators: true });
            return res.status(200).json({
                success: true,
                message: "Category Update successfully.",
                Catagories: newCategory,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const DeleteCategory = await Category.findByIdAndDelete(id)
        } catch {
            res.status(500).json({
                success: false,
                message: "delete successfully"
            });
        }
    } else {
        res.status(405).json({
            success: false,
            message: "Method not allowed.",
        });
    }
};
export default Catagories;