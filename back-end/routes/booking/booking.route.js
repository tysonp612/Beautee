const express = require("express");
const router = express.Router();
const bookingController = require("./../../controllers/booking/booking.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");

router.route("/booking_createBooking").post(bookingController.createBooking);

module.exports = router;
