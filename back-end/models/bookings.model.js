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
    actualService: [{ type: ObjectId, ref: "Services" }],
  },

  price: {
    estimatedPrice: {
      type: Number,
    },
    actualPrice: {
      type: Number,
    },
  },
  technicianMessages: [String],
  timeOfBooking: {
    type: Number,
  },
  period: {
    type: Number,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Processing", "Ready", "Finished"],
    default: "Processing",
  },
  totalPayment: {
    type: Number,
  },
};

module.exports = mongoose.model("Bookings", bookingsSchema);
``;
