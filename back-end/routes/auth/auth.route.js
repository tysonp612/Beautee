const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
const {
  authTokenCheck,
  adminCheck,
} = require("../../middlewares/authentication/authentication");

router.route("/auth_register").post(authController.userRegister);
router.route("/auth_login").post(authController.loginUser);
router
  .route("/auth_activate")
  .post(authTokenCheck, authController.activateUser);
router.route("/auth_resendVerifyLink").post(authController.sendVerifyLink);
router
  .route("/auth_sendResetPasswordEmail")
  .post(authController.sendResetPasswordEmail);
router
  .route("/auth_resetPassword")
  .post(authTokenCheck, authController.resetPassword);
router
  .route("/admin_check")
  .post(authTokenCheck, adminCheck, authController.adminController);
module.exports = router;
