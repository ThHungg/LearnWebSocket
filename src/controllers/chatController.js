const { Op } = require("sequelize");
const chatService = require("../services/chatService");

const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, type = "text" } = req.body;
    const senderId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tin nhắn của bạn" });
    }
    const response = await chatService.sendMessage(
      receiverId,
      content,
      type,
      senderId
    );
    return res.status(200).json(response);
  } catch (e) {}
};

const getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const userId = req.user.id;
    const offset = (page - 1) * limit;

    let whereCondition;

    if (otherUserId) {
      whereCondition = {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      };
    } else {
      whereCondition = {
        receiverId: null,
      };
    }

    const messages = await chatService.getMessages(
      whereCondition,
      parseInt(limit),
      parseInt(offset)
    );
    return res.status(200).json({ messages });
  } catch (e) {
    return res.status(500).json({
      message: "Lỗi hệ thống vui lòng thử lại sau!",
    });
  }
};

const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId } = req.body;
    const userId = req.user.id;

    await Message.update(
      { isRead: true },
      {
        where: {
          senderId,
          receiverId: userId,
          isRead: false,
        },
      }
    );

    return res.status(200).json({ message: "Đánh dấu tin nhắn đã đọc" });
  } catch (e) {}
};

module.exports = { sendMessage, getMessages, markMessagesAsRead };
