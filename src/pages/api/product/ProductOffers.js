export const getActiveOffers = async (req, res) => {
    try {
        const currentTime = new Date();
        const activeOffers = await Product.find({
            offerEndTime: { $gte: currentTime },
            featured: true, // Only fetch featured products
        });

        res.status(200).json({ success: true, data: activeOffers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
