const express = require("express");
const route = express.Router();
const chatController = require("../controllers/chatController");
const { authenicateToken } = require("../middleware/auth");

route.post("/message", authenicateToken, chatController.sendMessage);
route.get(
  "/messages/:otherUserId",
  authenicateToken,
  chatController.getMessages
);

route.put(
  "/messages/read",
  authenicateToken,
  chatController.markMessagesAsRead
);

module.exports = route;
