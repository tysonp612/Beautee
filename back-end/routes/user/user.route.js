const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");
const {
  authTokenCheck,
} = require("./../../middlewares/authentication/authentication");

router.route("/user_register").post(userController.userRegister);
router.route("/user_login").post(userController.loginUser);
router
  .route("/user_activate")
  .post(authTokenCheck, userController.activateUser);
router
  .route("/authTokenCheck")
  .post(authTokenCheck, userController.sendVerifyLink);
router
  .route("/user_sendResetPasswordEmail")
  .post(userController.sendResetPasswordEmail);
router
  .route("/user_resetPassword")
  .post(authTokenCheck, userController.resetPassword);
module.exports = router;
