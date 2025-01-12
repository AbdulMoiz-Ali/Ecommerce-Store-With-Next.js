import { verifyAccessToken } from "../../../middleware/verifyAccessToken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    verifyAccessToken(req, res, () => {
      res.status(200).json({ message: "Protected route accessed", user: req.user });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
