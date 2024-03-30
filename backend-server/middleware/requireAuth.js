const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token and authenticate the user
const requireAuth = (req, res, next) => {
  // Get the token from the request headers, typically sent as "Authorization: Bearer <token>"
  const token = req.headers.authorization;

  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // If the token is valid, you can attach the user's ID or other information to the request for further processing
    req.userId = decoded.id;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = requireAuth;