const Technician = require("./../models/technician.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("./../helper/validation");
exports.technicianRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      color,
      password,
    } = req.body;
    if (!validateEmail(email)) {
      res.status(400).json({ message: "Invalid email" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const technician = await new Technician({
      first_name,
      last_name,
      email,
      username,
      color,
      password: cryptedPassword,
    });
  } catch (err) {}
};
