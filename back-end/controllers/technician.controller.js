const Technician = require("./../models/technician.model");
const bcrypt = require("bcrypt");
const { validateEmail } = require("./../helper/validation");
const { generateToken } = require("./../helper/tokens");
const { sendVerifiedEmail } = require("./../helper/mailer");
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
    }).save();
    const emailVerificationToken = generateToken(
      { id: technician._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerifiedEmail(technician.email, technician.first_name, url);
    res.status(200).json({
      id: technician._id,
      username: technician.username,
      color: technician.color,
      picture: technician.picture,
      first_name: technician.first_name,
      last_name: technician.last_name,
      token,
      verified: technician.verified,
      message: "Register Success, please activate your email to start",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
