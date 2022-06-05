const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/user/user.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("../../middlewares/authentication/authentication");

router.route("/getAllUsers").get(userController.getAllUsers);

module.exports = router;
