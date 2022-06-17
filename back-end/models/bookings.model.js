const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bookingsSchema = {
  client: {
    type: ObjectId,
    ref: "Client",
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
  },
  services: {
    mainService: [{ type: ObjectId, ref: "Services" }],
    additionalService: {
      name: String,
      price: Number,
    },
  },

  price: {
    estimatedPrice: {
      type: Number,
    },
    adjustedPrice: {
      type: Number,
    },
  },
  timeOfBooking: {
    type: String,
  },
  note: {
    type: String,
  },
};

module.exports = mongoose.model("Bookings", bookingsSchema);
