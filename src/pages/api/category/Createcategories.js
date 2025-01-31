import connectDB from "../../../utils/db.js";
import Category from "../../../models/Category.js";
import cloudinary from "../../../middleware/cloudinary.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        await connectDB();

        const { title, image } = req.body;

        if (!title || !image) {
            return res.status(400).json({ success: false, message: "Title and Image are required" });
        }

        console.log("Uploading Image to Cloudinary...");

        // Upload Image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
            resource_type: "image",
        });

        console.log("Cloudinary Upload Successful:", cloudinaryResponse);

        // Store in Database
        const newCategory = await Category.create({
            title,
            image: cloudinaryResponse.secure_url, // Store the Cloudinary image URL
        });

        console.log("New Category Created:", newCategory);

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: newCategory,
        });

    } catch (error) {
        console.error("Error in Createcategories:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
