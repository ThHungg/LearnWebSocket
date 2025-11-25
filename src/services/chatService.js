const SocketServices = (io) => {
  const connection = () => {
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Lắng nghe tin nhắn từ client
      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        // Phát lại tin nhắn cho tất cả client
        io.emit("message", msg);
      });

      // Lắng nghe sự kiện ngắt kết nối
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  };

  return {
    connection,
  };
};

module.exports = SocketServices;
