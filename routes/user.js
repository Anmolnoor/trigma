const express = require("express");
const userController = require("../controllers/user");

const routers = express.Router();

routers.route("/login").post(userController.login);

routers.route("/register").post(userController.register);

routers.route("/update-password").patch(userController.updatePassword);

routers.route("/forget-password").patch(userController.forgetPassword);

module.exports = routers;
