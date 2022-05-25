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
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentification" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
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
