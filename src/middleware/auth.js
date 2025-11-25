const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenicateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (e) {
    if (e.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token" });
    }
    if (e.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token expired" });
    }

    res.status(500).json({ e: "Authentication error" });
  }
};

module.exports = { authenicateToken };
