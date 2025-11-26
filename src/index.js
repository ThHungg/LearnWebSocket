const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const route = require("./routes");
// const SocketServices = require("./services/chatService");
const { connectDB } = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
// const { Server } = require("socket.io");

global.__basedir = __dirname;
//Global biến toàn cục tồn tại trong toàn bộ project
//Biến đó nằm trong bộ nhớ chiếm tài nguyên của hệ thống

// Phục vụ file tĩnh từ thư mục gốc
app.use(express.static(path.join(__dirname, "../")));

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// Sử dụng SocketServices để quản lý kết nối
// const socketService = SocketServices(io);
// socketService.connection();
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware để truyền io instance cho routes
app.use((req, res, next) => {
  res.io = io;
  next();
});

route(app);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
  console.log(
    `Open http://localhost:${port} in your browser to test WebSocket`
  );
});
