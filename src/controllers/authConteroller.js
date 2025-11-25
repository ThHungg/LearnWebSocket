const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const regmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regmail.test(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }
    const response = await authService.register(username, email, password);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "Lỗi hệ thống vui lòng thử lại sau!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const response = await authService.login(email, password);
    console.log("response:", response);
    const { access_token, ...newReponse } = response;
    res.cookie("access_token", newReponse.user.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json(newReponse);
  } catch (e) {
    return res.status(404).json({
      message: "Lỗi hệ thống vui lòng thử lại sau!",
    });
  }
};

module.exports = {
  register,
  login,
};
