const path = require("path");
const HomeChatController = (req, res) => {
  try {
    res.sendFile(path.join(__basedir, "../index.html"));
  } catch (e) {}
};

const messageController = (req, res) => {
  try {
    const { msg } = req.query;
    const io = res.io;
    io.emit("message", msg);
    res.status(200).json({ message: "Message sent" });
  } catch (e) {}
};

module.exports = {
  HomeChatController,
  messageController,
};
