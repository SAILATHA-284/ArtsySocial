import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Malformed token" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "Server error: JWT secret not defined" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the email matches the admin email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Unauthorized: Invalid admin credentials" });
    }

    // Token is valid and belongs to the admin
    next();
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default adminAuth;
