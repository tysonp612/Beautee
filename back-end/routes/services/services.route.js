const express = require("express");
const router = express.Router();
const servicesController = require("./../../controllers/services/services.controller");

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication/authentication");

router
  .route("/admin_createServices")
  .post(authTokenCheck, adminCheck, servicesController.createService);

router
  .route("/admin_getAllServices")
  .post(authTokenCheck, adminCheck, servicesController.getAllServices);
module.exports = router;
