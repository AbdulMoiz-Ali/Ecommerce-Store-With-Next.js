import connectDB from "../../../utils/db";
import User from "../../../models/User";
import { validateUserInput } from "../../../middleware/validateUser";
import { hashPassword } from "../../../middleware/hashPassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    validateUserInput(req, res, async () => {
      await hashPassword(req, res, async () => {
        try {
          const { name, email, password } = req.body;

          const userExists = await User.findOne({ email });
          if (userExists) return res.status(400).json({ message: "Email already exists" });

          const newUser = new User({ name, email, password });
          await newUser.save();

          res.status(201).json({ message: "User created successfully", data: { name, email } });
        } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
