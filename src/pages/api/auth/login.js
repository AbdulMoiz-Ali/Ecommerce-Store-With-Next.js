import connectDB from "../../../utils/db";
import User from "../../../models/User";
import { validateLoginInput } from "../../../middleware/validateUser";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtUtils";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    validateLoginInput(req, res, async () => {
      try {
        const { email, password } = req.body;
        if (email === "admin@gmail.com" && password === "admin123") {
          const accessToken = jwt.sign(
            { email: "admin@gmail.com" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "Admin login successful",
            user: {
              name: "Admin",
              email: "admin@gmail.com",
            },
            accessToken,
            isAdmin: true, // Indicate admin login
          });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
        res.status(200).json({ message: "Login successful", accessToken, user: { name: user.name, email: user.email } });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
