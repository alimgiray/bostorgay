const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = {
  sign,
  verify,
};

function sign(user) {
  const token = jwt.sign(user, secret, { expiresIn: "30d" });
  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, secret);
  } catch(err) {
    return null;
  }
}
