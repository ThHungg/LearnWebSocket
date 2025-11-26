const { Message } = require("../models");

const sendMessage = async (receiverId, content, type, senderId) => {
  try {
    const message = await Message.create({
      senderId,
      receiverId: receiverId || null,
      content: content.trim(),
      type,
    });

    const messageWithSender = await Message.findByPk(message.id, {
      include: [
        { model: User, as: "sender", attributes: ["id", "username"] },
        { model: User, as: "receiver", attributes: ["id", "username"] },
      ],
    });

    const io = res.io;

    if (receiverId) {
      io.to(`user_${receiverId}`).emit("new_message", messageWithSender);
      io.to(`user_${senderId}`).emit("new_message", messageWithSender);
    } else {
      io.emit("new_message", messageWithSender);
    }

    return { message: "Gửi tin nhắn thành công", data: messageWithSender };
  } catch (e) {
    return { message: "Lỗi hệ thống vui lòng thử lại sau!" };
  }
};

const getMessages = async (whereCondition, limit, offset) => {
  try {
    const messages = await Message.findAll({
      where: whereCondition,
      include: [
        { model: User, as: "sender", attributes: ["id", "username"] },
        { model: User, as: "receiver", attributes: ["id", "username"] },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return messages;
  } catch (e) {
    return { message: "Lỗi hệ thống vui lòng thử lại sau!" };
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
