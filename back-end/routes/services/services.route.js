const express = require("express");
const router = express.Router();
const servicesController = require("./../../controllers/services/services.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");

router
  .route("/createServices")
  .post(authTokenCheck, adminCheck, servicesController.createService);

router.route("/getAllServices").get(servicesController.getAllServices);
module.exports = router;
