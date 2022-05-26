const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");

router.route("/user_register").post(userController.userRegister);
router.route("/user_login").post(userController.loginUser);
module.exports = router;
