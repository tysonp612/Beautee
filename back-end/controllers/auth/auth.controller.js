const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../../helper/validation");
const { generateToken } = require("../../helper/tokens");
const { sendVerifiedEmail, sendResetPassword } = require("../../helper/mailer");

exports.sendVerifyLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "No user found with this email" });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}email=${email}`;
    sendVerifiedEmail(user.email, user.first_name, url);
    res
      .status(200)
      .json({ message: "A new verified link was sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminController = async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
  }
};

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
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}email=${email}`;
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
      message: "Register successfully, please activate your email to start",
    });
  } catch (err) {
    console.log(err);
    if (err.message.includes("email_1 dup key")) {
      res.status(500).json({ message: "This email has been used already!" });
    } else {
      res.status(500).json({
        message: `Registration failed!`,
      });
    }
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
    if (user.verified !== true) {
      return res.status(400).json({
        message: "Please verify your account before logging in",
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
      message: "Login successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = req.user;

    //get user by token id
    const checkUser = await User.findById(user._id);

    //check if user have been verified
    if (checkUser.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    }
    if (!checkUser) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    await User.findByIdAndUpdate(user._id, { verified: true, new: true });
    return res.status(200).json({
      message: "Account has beeen activated successfully.",
    });
  } catch (err) {
    if (err.message.includes("jwt expired")) {
      res.status(500).json({
        message:
          "Your verification link has expired, please choose resend link",
      });
    } else {
      res.status(500).json("Verification failed, please choose resend link");
    }
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
    const url = `${process.env.BASE_URL}/reset-password/${passwordResetToken}`;
    await sendResetPassword(checkUser.email, checkUser.first_name, url);

    res.status(200).json({
      message: "A password reset link has been sent to your email address",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    const updatePassword = await User.findByIdAndUpdate(id, {
      password: cryptedPassword,
      new: true,
    });
    if (req.user.verified !== true) {
      await User.findByIdAndUpdate(id, { verified: true, new: true });
    }
    res
      .status(200)
      .json({ message: "Your password has been updated, please log in again" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
