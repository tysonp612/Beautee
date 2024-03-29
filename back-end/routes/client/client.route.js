const express = require("express");
const router = express.Router();
const clientController = require("./../../controllers/client/client.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");

router
  .route("/createClient")
  .post(authTokenCheck, adminCheck, clientController.createClient);

router.route("/findClient").post(authTokenCheck, clientController.findClient);

router
  .route("/updateBookingForClient")
  .post(authTokenCheck, adminCheck, clientController.updateBookingForClient);

router
  .route("/getAllFinshiedBookingsForClient")
  .post(
    authTokenCheck,
    adminCheck,
    clientController.getAllFinshiedBookingsForClient
  );
module.exports = router;
