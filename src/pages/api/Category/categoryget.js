import Category from "../../../models/Category.js";

export default async function handler(req, res) {

  if (req.method === "GET") {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
