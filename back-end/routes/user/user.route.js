const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/user/user.controller");
const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");

router.route("/user_register").post(userController.userRegister);
router.route("/user_login").post(userController.loginUser);
router
  .route("/user_activate")
  .post(authTokenCheck, userController.activateUser);
router.route("/user_resendVerifyLink").post(userController.sendVerifyLink);
router
  .route("/user_sendResetPasswordEmail")
  .post(userController.sendResetPasswordEmail);
router
  .route("/user_resetPassword")
  .post(authTokenCheck, userController.resetPassword);
router
  .route("/admin_check")
  .post(authTokenCheck, adminCheck, userController.adminController);
module.exports = router;
