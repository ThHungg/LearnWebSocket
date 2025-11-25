const express = require("express");
const route = express.Router();
const chatController = require("../controllers/chatController");

route.get("/", chatController.HomeChatController);
route.get("/message", chatController.messageController);
module.exports = route;
