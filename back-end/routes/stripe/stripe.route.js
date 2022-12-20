const express = require("express");
const router = express.Router();
const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");
const {
  createPaymentIntent,
} = require("./../../controllers/stripe/stripe.controller");

router
  .route("/create-payment-intent")
  .post(authTokenCheck, adminCheck, createPaymentIntent);

module.exports = router;
