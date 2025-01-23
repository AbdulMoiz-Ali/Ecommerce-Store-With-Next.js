import connectDB from "../../../utils/db";
import User from "../../../models/User";
import { validateLoginInput } from "../../../middleware/validateUser";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtUtils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    validateLoginInput(req, res, async () => {
      try {
        const { email, password } = req.body;

        // Admin login logic
        if (email === "admin@gmail.com" && password === "admin123") {
          const accessToken = jwt.sign(
            { email: "admin@gmail.com", role: "admin" },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "Admin login successful",
            user: {
              name: "Admin",
              email: "admin@gmail.com",
              role: "admin",
            },
            accessToken,
          });
        }

        // User login logic
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const accessToken = generateAccessToken({ id: user._id, role: "user" });
        const refreshToken = generateRefreshToken({ id: user._id, role: "user" });

        // Set the refresh token in an HTTP-only cookie
        res.setHeader(
          "Set-Cookie",
          `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}` // 7 days expiry
        );

        return res.status(200).json({
          message: "User login successful",
          accessToken,
          user: {
            name: user.name,
            email: user.email,
            role: "user",
          },
        });
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}