// import Category from "../../../models/Category.js";
// import connectDB from "../../../utils/db.js";
// import cloudinary from "../../../middleware/cloudinary.js";
// import mongoose from "mongoose";

// // Upload Image to Cloudinary
// const uploadImageToCloudinary = async (imageBase64) => {
//     try {
//         const uploadResult = await cloudinary.uploader.upload(imageBase64, {
//             resource_type: "image",
//         });
//         return uploadResult.secure_url;
//     } catch (error) {
//         console.error("Cloudinary Upload Error:", error);
//         return null;
//     }
// };

// const Categories = async (req, res) => {
//     await connectDB();
//     const { id } = req.query;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid ID" });
//     }

//     if (!id) {
//         return res.status(400).json({
//             success: false,
//             message: "Category ID is required."
//         });
//     }

//     if (req.method === "PUT") {
//         const { title, image } = req.body;

//         if (!title || !image) {
//             return res.status(400).json({ error: "Title and Image are required" });
//         }

//         try {
//             const imageUrl = await uploadImageToCloudinary(image);
//             if (!imageUrl) {
//                 return res.status(500).json({ message: "Error uploading image to Cloudinary." });
//             }

//             const updatedCategory = await Category.findByIdAndUpdate(
//                 id,
//                 { title, image: imageUrl },
//                 { new: true, runValidators: true }
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: "Category updated successfully.",
//                 category: updatedCategory,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     } else if (req.method === "DELETE") {
//         try {
//             const deletedCategory = await Category.findByIdAndDelete(id);
//             if (!deletedCategory) {
//                 return res.status(404).json({ success: false, message: "Category not found" });
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: "Category deleted successfully",
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     } else {
//         res.status(405).json({
//             success: false,
//             message: "Method not allowed.",
//         });
//     }
// };

// // ✅ Increase the request size limit to allow larger image uploads
// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: "10mb", // Increase limit to 10MB
//         },
//     },
// };

// export default Categories;



import connectDB from "../../../utils/db.js";
import Category from "../../../models/Category.js";
import cloudinary from "../../../middleware/cloudinary.js";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await connectDB();

    const { id } = req.query;
    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Category ID" });
    }

    if (req.method === "PUT") {
        // ✅ Update Category
        try {
            let { title, image } = req.body;
            title = title?.trim(); // Remove extra spaces
            console.log(title, image)
            if (!title || !image) {
                return res.status(400).json({ success: false, message: "Title and Image are required" });
            }

            let imageUrl = image;
            // ✅ Only upload if it's a new base64 image
            if (image.startsWith("data:image")) {
                console.log("Uploading new Image to Cloudinary...");
                const cloudinaryResponse = await cloudinary.uploader.upload(image, {
                    resource_type: "image",
                });
                console.log("Cloudinary Upload Successful:", cloudinaryResponse);
                imageUrl = cloudinaryResponse.secure_url;
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { title, image: imageUrl },
            );

            return res.status(200).json({
                success: true,
                message: "Category updated successfully.",
                category: updatedCategory,
            });
        } catch (error) {
            console.error("Error in Update Category:", error);
            return res.status(500).json({ success: false, message: "Server error, try again later." });
        }

    } else if (req.method === "DELETE") {
        // ✅ Delete Category
        try {
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully.",
            });
        } catch (error) {
            console.error("Error in Delete Category:", error);
            return res.status(500).json({ success: false, message: "Server error, try again later." });
        }

    } else {
        // ✅ Method Not Allowed
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
