const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const clientSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name is too short"],
      maxlength: [32, "First name is too long"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name is too short"],
      maxlength: [32, "Last name is too long"],
      trim: true,
      text: true,
    },
    number: {
      type: String,
      required: [true, "Client's phone number is required"],
      trim: true,
      text: true,
      unique: [true, "This client has already been registered"],
    },
    email: {
      type: String,
      trim: true,
      sparse: true,
      index: true,
      unique: true,
    },
    bookings: [
      {
        booking: {
          type: ObjectId,
          ref: "Booking",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
