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

module.exports = router;
