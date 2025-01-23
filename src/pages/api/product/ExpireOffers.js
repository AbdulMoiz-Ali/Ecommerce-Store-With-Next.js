import connectDB from "../../../utils/db";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        try {
            await Product.findByIdAndUpdate(productId, { $unset: { offerEndTime: "" } });
            res.status(200).json({ success: true, message: "Offer expired successfully." });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
    }
}

// frontend 
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProductOffer = ({ product }) => {
//     const [timeLeft, setTimeLeft] = useState(null);

//     useEffect(() => {
//         if (product.offerEndTime) {
//             const endTime = new Date(product.offerEndTime).getTime();
//             const interval = setInterval(() => {
//                 const currentTime = new Date().getTime();
//                 const remainingTime = endTime - currentTime;
//                 if (remainingTime <= 0) {
//                     clearInterval(interval);
//                     handleOfferExpire(); // Call API when time expires
//                 } else {
//                     setTimeLeft(remainingTime);
//                 }
//             }, 1000);

//             return () => clearInterval(interval); // Cleanup on unmount
//         }
//     }, [product.offerEndTime]);

//     const handleOfferExpire = async () => {
//         try {
//             await axios.post("/api/expireOffers", { productId: product._id });
//             alert("Offer expired and updated successfully!");
//         } catch (error) {
//             console.error("Error expiring offer:", error);
//         }
//     };

//     const formatTime = (ms) => {
//         const seconds = Math.floor((ms / 1000) % 60);
//         const minutes = Math.floor((ms / 1000 / 60) % 60);
//         const hours = Math.floor(ms / 1000 / 60 / 60);
//         return `${hours}h ${minutes}m ${seconds}s`;
//     };

//     return (
//         <div>
//             <h3>{product.name}</h3>
//             {product.offerEndTime && timeLeft > 0 ? (
//                 <p>Offer ends in: {formatTime(timeLeft)}</p>
//             ) : (
//                 <p>Offer expired</p>
//             )}
//         </div>
//     );
// };

// export default ProductOffer;
