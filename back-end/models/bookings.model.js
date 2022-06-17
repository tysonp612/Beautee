const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bookingsSchema = {
  bookings: [
    {
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
      services: [
        {
          mainService: { type: ObjectId, ref: "Services" },
          additionalService: {
            name: String,
            price: Number,
          },
        },
      ],
      price: {
        estimatedPrice: {
          type: Number,
        },
        adjustedPrice: {
          type: Number,
        },
      },
      timeOfBooking: {
        type: Number,
      },
      note: {
        type: String,
      },
    },
  ],
};

const Bookings = mongoose.model("Bookings", bookingsSchema);
module.exports = Bookings;
