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
    userId = userTokenCheck.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("No user found!");
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
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
