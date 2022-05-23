const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const technicianSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: [true, "frist name is required"],
    mminlength: [2, "First name is too short"],
    maxlength: [32, "First name is too long"],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    minlength: [2, "Last name is too short"],
    maxlength: [32, "Last name is too long"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: [2, "User name is too short"],
    maxlength: [32, "User name is too long"],
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  pictrue: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  currentCustumer: {
    type: ObjectId,
    ref: "Customer",
  },
  moneyRecord: [
    {
      money: {
        type: Number,
      },
      tip: {
        type: Number,
      },
      date: {
        type: String,
      },
    },
  ],
});
