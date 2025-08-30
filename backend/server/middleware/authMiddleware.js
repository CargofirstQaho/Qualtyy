// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "my-super-secret-key"
    );
    // Attach the decoded JWT payload to the request object.
    // This `decoded` object is expected to contain the user's ID (e.g., as `id` or `sub`)
    // and a `hasDocuments` boolean flag.
    req.user = decoded;
    req.user = {
      id: decoded.id || decoded.userId, // 👈 support both
      email: decoded.email,
      role: decoded.role,
      hasDocuments: decoded.hasDocuments,
    };
    // Check for document status here as part of authorization
    if (!req.user.hasDocuments) {
      // If the user hasn't uploaded documents, deny access
      return res.status(403).json({
        message: "You must upload your documents to raise an enquiry.",
      });
    }

    // If the token is valid and the user has required documents, proceed to the next middleware/route handler
    next();
  } catch (err) {
    // Handle cases where the token is invalid or expired
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
