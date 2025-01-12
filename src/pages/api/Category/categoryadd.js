import Category from "../../../models/Category.js";
import cloudinary from "../../../middleware/cloudinary.js";
import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({ dest: "./upload" });

const handler = nextConnect();
handler.use(upload.single("image"));

handler.post(async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const category = await Category.create({
      title,
      description,
      image: uploadResult.url,
    });

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

export default handler;
