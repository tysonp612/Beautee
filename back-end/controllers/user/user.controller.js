const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../../helper/validation");
const { generateToken } = require("../../helper/tokens");
const { sendVerifiedEmail, sendResetPassword } = require("../../helper/mailer");
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
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
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
      role: user.role,
      verified: user.verified,
      message: "Register Success, please activate your email to start",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.loginCredentials;
    const user = await User.findOne({ email: email.toLowerCase() });
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
      role: user.role,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const token = req.body.token.id;

    //check if there is any token from body
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    //verify token
    const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;
    //get user by token id
    const checkUser = await User.findById(userId);
    //check if user have been verified
    if (checkUser.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    }
    if (!checkUser) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    await User.findByIdAndUpdate(userId, { verified: true });
    return res.status(200).json({
      message: "Account has beeen activated successfully.",
      id: checkUser._id,
      color: checkUser.color,
      username: checkUser.username,
      picture: checkUser.picture,
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      token: token,
      role: checkUser.role,
      verified: checkUser.verified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendResetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(500).json({
        message:
          "There is no account linked to this email address, please try again",
      });
    }
    const passwordResetToken = generateToken(
      { id: checkUser._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/reset-pasword/${passwordResetToken}`;
    sendResetPassword(checkUser.email, checkUser.first_name, url);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
