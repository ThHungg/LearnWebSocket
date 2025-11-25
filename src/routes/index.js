const chatRoute = require("./chatRoute");
const AuthRoute = require("./authRoute");

const routes = (app) => {
  app.use("/api/chat", chatRoute);
  app.use("/api/auth", AuthRoute);
};

module.exports = routes;
