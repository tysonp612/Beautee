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
    const userTokenCheck = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, res) => {
        if (err) {
          return res.status(400).json({ message: "Invalid Authentification" });
        }
        userId = res.id;
      }
    );
    const user = await User.findById(userId);
    if (user.verified !== true) {
      return res.status(400).json({
        message:
          "Your account has not been verified, please verify before continue",
      });
    }
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
