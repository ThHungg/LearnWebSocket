const jwt = require("jsonwebtoken");

const genneralAccessToken = (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return access_token;
};

module.exports = {
  genneralAccessToken,
};
