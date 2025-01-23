import connectDB from "../../../utils/db.js";
import Category from "../../../models/Category.js";
import cloudinary from './../../../middleware/cloudinary.js'



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


const Createcatagories = async (req, res) => {
    await connectDB();
    if (req.method === "POST") {

        const { title } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Blog should have an image" });
        }

        try {

            const imageUrl = await uploadImageToCloudinary(req.file.path);

            if (!imageUrl) {
                return res.status(500).json({ message: "Error uploading image to Cloudinary." });
            }
            const newCategory = await Category.create({ title });
            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully.",
                Catagories: newCategory, // Properly return the product list
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
export default Createcatagories;