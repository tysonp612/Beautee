const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/user/user.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("../../middlewares/authentication/authentication");

router.route("/getAllUsers").get(userController.getAllUsers);
router
  .route("/updateTipAndWage")
  .post(authTokenCheck, adminCheck, userController.updateTipAndWage);
router
  .route("/calculateTotalMoney")
  .post(authTokenCheck, userController.calculateTotalMoney);
router
  .route("/getFinishedBookingsTechnician")
  .post(authTokenCheck, userController.getFinishedBookingsTechnician);
module.exports = router;
