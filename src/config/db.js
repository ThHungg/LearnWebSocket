const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    console.log("🔄 Đang kết nối database...");
    await sequelize.authenticate();
    console.log("✅ Kết nối database thành công!");
  } catch (e) {
    console.error("Chi tiết lỗi:", e.name);
  }
};

module.exports = { sequelize, connectDB }; 
