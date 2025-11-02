import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get token from header: "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // extract token

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      // Add decoded user info to request
      req.user = decoded;
      next(); // ✅ Continue to the next middleware/controller
    });
  } catch (error) {
    res.status(500).json({ error: "Server error in token verification" });
  }
};
