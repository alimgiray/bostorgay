const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = {
  sign,
  verify,
};

function sign(user) {
  const token = jwt.sign(user, secret, { expiresIn: "7d" });
  return token;
}

function verify(token) {
  return jwt.verify(token, secret);
}
