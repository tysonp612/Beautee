const jwt = require("jsonwebtoken");
const User = require("./../../models/user.model");
exports.authTokenCheck = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    let userId;
    const userTokenCheck = jwt.verify(token, process.env.TOKEN_SECRET);
    (err, res) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      userId = res.id;
    };
    const user = await User.findById(userId);

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { user } = req;
    const admin = await User.findById(user._id);
    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }
    if (admin.role === "admin") {
      return res.status(200).json({ message: "Admin confirm" });
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

exports.resendVerifyAuthCheck = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json("No user found!");
    }
    req.user = user;
    next();
  } catch (err) {}
};
