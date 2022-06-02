const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "frist name is required"],
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
    role: {
      type: String,
      default: "technician",
    },
    color: {
      type: String,
      required: [true, "Each nail technician must have a unique color"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: [
        true,
        "This email has already been used, please try a different email",
      ],
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
    bookings: [
      {
        booking: {
          type: ObjectId,
          ref: "Booking",
        },
      },
    ],
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
    dailyRecord: [
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
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
