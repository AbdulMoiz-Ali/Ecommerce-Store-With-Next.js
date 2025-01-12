export default async function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "refreshToken=; HttpOnly; Path=/; Max-Age=0");
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
