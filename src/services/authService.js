const bcrypt = require("bcryptjs/dist/bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { genneralAccessToken } = require("./jwtService");
const register = async (username, email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return { message: "Email đã được đăng ký" };
    }
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPass,
    });
    return { message: "Đăng ký thành công", user: newUser };
  } catch (e) {
    return { message: "Lỗi hệ thống vui lòng thử lại sau!" };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { message: "Tài khoản không tồn tại" };
    }
    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) {
      return { message: "Mật khẩu không đúng" };
    }
    const access_token = genneralAccessToken({
      userId: user.id,
    });

    await user.update({
      satatus: "online",
      lastSeen: new Date(),
    });

    return {
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        access_token,
      },
    };
  } catch (e) {
    return { message: "Lỗi hệ thống vui lòng thử lại sau!" };
  }
};

module.exports = {
  register,
  login,
};
