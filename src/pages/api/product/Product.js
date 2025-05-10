import Product from "../../../models/Product.js";
import connectDB from "../../../utils/db.js";
import cloudinary from "../../../middleware/cloudinary.js"
import nextConnect from "next-connect";
import { upload } from "../../../middleware/multer.js";

const autoAssignAdsAndTopPicks = async () => {
    // Reset all products' featured and topPick to false
    await Product.updateMany({}, { $set: { featured: false, topPick: false } });

    // Find top 5 products for featured based on discount
    const featuredProducts = await Product.find({ isEnabled: true, discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .limit(5);

    // Update only top 5 products as featured
    await Product.updateMany(
        { _id: { $in: featuredProducts.map((p) => p._id) } },
        { $set: { featured: true } }
    );

    // Find top 3 products for topPick based on discount
    const topPickProducts = await Product.find({ isEnabled: true, discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .limit(3);

    // Update only top 3 products as topPick
    await Product.updateMany(
        { _id: { $in: topPickProducts.map((p) => p._id) } },
        { $set: { topPick: true } }
    );
};

// Function to upload image to Cloudinary and return the URL
const uploadImageToCloudinary = async (localPath) => {
    try {
        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            resource_type: "image", // Ensure we upload only images
        });

        // Uncomment to delete the local file after upload
        // fs.unlinkSync(localPath);

        return uploadResult.url;  // Return the URL of the uploaded image
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        // Uncomment to delete the local file on error
        // fs.unlinkSync(localPath);
        return null;
    }
};

// Next-Connect Handler
const createProduct = nextConnect({
    onError: (err, req, res) => {
        res.status(500).json({ success: false, message: `Error: ${err.message}` });
    },
    onNoMatch: (req, res) => {
        res.status(405).json({ success: false, message: `Method '${req.method}' not allowed.` });
    },
});

// Attach Multer Middleware
// createProduct.use(upload.single("image"));
createProduct.use(upload.array("images", 5));
// 'images' = name of field, 5 = max 5 files (you can change it)


createProduct.post(async (req, res) => {
    await connectDB();
    try {
        // Step 1: Get product data from request body
        const {
            name,
            price,
            discount,
            stock,
            delivery,
            offerEndTime,
            featured,
            description,
            variations,
            reviews,
            additionalInfo,
            topPick,
            category,
            selectionMode, // Manual or Auto
        } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Product should have at least one image" });
        }
        // Upload all images to Cloudinary
        const imageUrls = [];

        for (const file of req.files) {
            const url = await uploadImageToCloudinary(file.path);
            if (url) {
                imageUrls.push(url);
            }
        }
        // if (!req.file) {
        //     return res.status(400).json({ error: "Blog should have an image" });
        // }

        // const imageUrl = await uploadImageToCloudinary(req.file.path);

        // if (!imageUrl) {
        //     return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
        // }
        // // Step 2: Check Selection Mode
        if (selectionMode === "auto") {
            // Auto Mode: Automatically set featured and topPick
            const isFeatured = false; // Default, handled by autoAssignAdsAndTopPicks
            const isTopPick = false; // Default, handled by autoAssignAdsAndTopPicks

            // Step 3: Create Product with default featured/topPick
            const newProduct = await Product.create({
                name,
                imageUrls,
                price,
                discount,
                stock,
                delivery,
                offerEndTime: offerEndTime || null,
                featured: isFeatured, // Auto logic will override this
                topPick: isTopPick,   // Auto logic will override this
                selectionMode,
                description,
                variations,
                reviews,
                additionalInfo,
                category
            });

            // Trigger auto calculation after product is created
            await autoAssignAdsAndTopPicks();

            return res.status(201).json({
                success: true,
                message: "Product created successfully in auto mode.",
                product: newProduct,
            });
        } else if (selectionMode === "manual") {
            // Manual Mode: Use admin input directly
            const newProduct = await Product.create({
                name,
                imageUrls,
                price,
                discount,
                stock,
                delivery,
                offerEndTime: offerEndTime || null,
                featured, // Admin decides this in manual mode
                topPick,  // Admin decides this in manual mode
                selectionMode,
                description,
                variations,
                reviews,
                additionalInfo,
                category
            });
            console.log(newProduct)
            return res.status(201).json({
                success: true,
                message: "Product created successfully in manual mode.",
                product: newProduct,
            });

        } else {
            // Invalid selectionMode
            throw new Error("Invalid selection mode");
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



export default createProduct;