const jwt = require("../helpers/jwt");

authenticate = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    res.sendStatus(401);
    return;
  }
  const token = header.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  const user = jwt.verify(token);
  if (!user) {
    res.sendStatus(401);
    return;
  }
  if (user.type !== "admin" || user.type !== "editor") {
    res.sendStatus(401);
    return;
  }
  req.user = user;
  next();
};

module.exports = authenticate;
