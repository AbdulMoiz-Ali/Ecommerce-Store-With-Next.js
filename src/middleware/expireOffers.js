
const expireOffers = async () => {
    const currentTime = new Date();
    await Product.updateMany(
        { offerEndTime: { $lte: currentTime } },
        { $unset: { offerEndTime: "" } }
    );
};