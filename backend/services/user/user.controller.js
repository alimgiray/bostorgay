const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("../../helpers/validate-request");
const authenticateAdmin = require("../../helpers/authenticate-admin");

const userService = require("./user.service");

router.post("/register", registerSchema, register);
router.post("/login", loginSchema, login);
router.get("/", authenticateAdmin, getAllUsers);
router.delete("/:id", authenticateAdmin, deleteUser);
router.put("/:id/", authenticateAdmin, updateUserSchema, updateUser);

function registerSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().required().min(8),
  });
  validateRequest(req, res, next, schema);
}

function register(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  userService
    .register(username, password, email)
    .then((resp) => res.json(resp))
    .catch(next);
}

function loginSchema(req, res, next) {
  const schema = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().required().min(8),
  });
  validateRequest(req, res, next, schema);
}

function login(req, res, next) {
  const password = req.body.password;
  const email = req.body.email;
  userService
    .login(email, password)
    .then((resp) => res.json(resp))
    .catch(next);
}

function getAllUsers(req, res, next) {
  userService
    .getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
}

function deleteUser(req, res, next) {
  const userID = req.params.id;
  userService
    .deleteUser(userID)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function updateUserSchema(req, res, next) {
  const schema = Joi.object({
    type: Joi.string().required().min(1).valid("user", "editor"),
  });
  validateRequest(req, res, next, schema);
}

function updateUser(req, res, next) {
  const userID = req.params.id;
  const type = req.body.type;
  userService
    .updateUser(userID, type)
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = router;
