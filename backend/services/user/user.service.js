const bcrypt = require("bcryptjs");

const jwt = require("../../helpers/jwt");
const errors = require("../../errors");

const User = require("./user.model");

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
};

async function register(username, password, email) {
  const hash = await bcrypt.hash(password, 10);
  let user = null;
  try {
    user = await User.create({ username, password: hash, email });
    user = await user.save();
    if (user.id === 1) {
      user.type = "admin";
      user = await user.save();
    }
  } catch (err) {
    if (err.name.includes("UniqueConstraintError")) {
      throw new errors.AppError(
        errors.errorTypes.NOT_VALID,
        400,
        "Username or email already exists",
        true
      );
    } else {
      throw err;
    }
  }
  return {
    token: jwt.sign({ id: user.id, type: user.type }),
    username: username,
    type: user.type,
  };
}

async function login(email, password) {
  const user = await User.findOne({ where: { email: email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      token: jwt.sign({ id: user.id, type: user.type }),
      username: user.username,
      type: user.type,
    };
  }
  throw new errors.AppError(
    errors.errorTypes.NOT_AUTHORIZED,
    401,
    "Invalid email or password",
    true
  );
}

async function getUser(userId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "User not found",
      true
    );
  }
  return user;
}

async function getAllUsers() {
  return await User.findAll({});
}

async function deleteUser(userID) {
  const user = await getUser(userID);
  await user.destroy();
}

async function updateUser(userID, type) {
  const user = await getUser(userID);
  user.type = type;
  return await user.save();
}
