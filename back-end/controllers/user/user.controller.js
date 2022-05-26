const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../../helper/validation");
const { generateToken } = require("../../helper/tokens");
const { sendVerifiedEmail } = require("../../helper/mailer");
exports.userRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      color,
      password,
    } = req.body.credentials;
    if (!validateEmail(email)) {
      res.status(400).json({ message: "Invalid email" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      first_name,
      last_name,
      email,
      username,
      color,
      password: cryptedPassword,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerifiedEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "30d");
    res.status(200).json({
      id: user._id,
      username: user.username,
      color: user.color,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success, please activate your email to start",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "30d");
    res.status(200).json({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

// exports.activateAccount = async (req, res) => {
//   try {
//     const
//   }
// };
