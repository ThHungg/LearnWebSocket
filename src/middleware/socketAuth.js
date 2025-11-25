const jwt = require("jsonwebtoken");
const { User } = require("../models");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return next(new Error("Unauthorized"));
    }
    socket.userId = user.id;
    socket.username = user.username;
    socket.user = user;
    next();
  } catch (e) {
    next(new Error("Authentication error"));
  }
};

module.exports = socketAuth;
