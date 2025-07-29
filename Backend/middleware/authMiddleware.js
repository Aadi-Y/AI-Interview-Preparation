const jwt = require("jsonwebtoken");
const User = require("../modals/userModal"); // Ensure correct path

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          error: true,
          message: "User no longer exists",
        });
      }

      next();
    } else {
      return res.status(401).json({
        error: true,
        message: "Not authorized, no token",
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Token verification failed",
      detail: err.message,
    });
  }
};

module.exports = { protect };
