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
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateUser = async (req, res) => {
  try {
    //get user id from user with header token by auth middlewares
    const validUser = req.user.id;
    //get token from body as user click on verify link
    const { token } = req.body.token;
    //get user id from verifying token with secret key
    const userId = jwt.verify(token, process.env.TOKEN_SECRET);
    //get user by token id
    const checkUser = await User.findById(userId);
    //check if 2 token are the same
    if (validUser !== checkUser._id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }
    //check if there is any token from body
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    //check if user have been verified
    if (checkUser.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already activated." });
    }
    if (!checkUser) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    await User.findByIdAndUpdate(userId, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has beeen activated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
