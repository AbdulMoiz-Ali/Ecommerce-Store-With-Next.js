// import Product from "../../../models/Product.js";
// import dbConnect from "../../../utils/db.js";

// export default async function handler(req, res) {
//     await dbConnect();

//     const { method } = req;

//     switch (method) {
//         case "POST":
//             try {
//                 const product = await Product.create(req.body);
//                 res.status(201).json({ success: true, data: product });
//             } catch (error) {
//                 res.status(400).json({ success: false, message: error.message });
//             }
//             break;

//         case "PUT":
//             try {
//                 const { id } = req.query; // Product ID from query params
//                 const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//                     new: true,
//                 });

//                 if (!updatedProduct) {
//                     return res.status(404).json({ success: false, message: "Product not found" });
//                 }

//                 res.status(200).json({ success: true, data: updatedProduct });
//             } catch (error) {
//                 res.status(400).json({ success: false, message: error.message });
//             }
//             break;

//         default:
//             res.status(405).json({ success: false, message: "Method not allowed" });
//             break;
//     }
// }


const autoAssignAdsAndTopPicks = async () => {
    const featuredProducts = await Product.find({ isEnabled: true, discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .limit(5); // Top 5 for featured

    await Product.updateMany(
        { _id: { $in: featuredProducts.map((p) => p._id) } },
        { $set: { featured: true } }
    );

    const topPickProducts = await Product.find({ isEnabled: true, discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .limit(3); // Top 3 for toppick

    await Product.updateMany(
        { _id: { $in: topPickProducts.map((p) => p._id) } },
        { $set: { topPick: true } }
    );
};



const createProduct = async (req, res) => {
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
            topPick,
            selectionMode, // Manual or Auto
        } = req.body;

        // Step 2: Check Selection Mode
        if (selectionMode === "auto") {
            // Auto Mode: Automatically set featured and topPick
            const isFeatured = false; // Default, handled by autoAssignAdsAndTopPicks
            const isTopPick = false; // Default, handled by autoAssignAdsAndTopPicks

            // Step 3: Create Product with default featured/topPick
            const newProduct = await Product.create({
                name,
                price,
                discount,
                stock,
                delivery,
                offerEndTime: offerEndTime || null,
                featured: isFeatured, // Auto logic will override this
                topPick: isTopPick,   // Auto logic will override this
                selectionMode,
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
                price,
                discount,
                stock,
                delivery,
                offerEndTime: offerEndTime || null,
                featured, // Admin decides this in manual mode
                topPick,  // Admin decides this in manual mode
                selectionMode,
            });

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
};
