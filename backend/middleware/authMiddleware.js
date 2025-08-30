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
    req.user = decoded; // Attach payload to request

    // Check for document status here
    if (!req.user.hasDocuments) {
      // If the user hasn't uploaded documents, deny access
      return res.status(403).json({
        message: "You must upload your documents to raise an enquiry.",
      });
    }

    // If the token is valid and the user has documents, proceed
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
