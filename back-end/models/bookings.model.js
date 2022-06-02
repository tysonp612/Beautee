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
      services: [
        {
          mainService: { type: ObjectId, ref: "Services" },
          additionalService: {
            name: String,
            price: Number,
          },
        },
      ],
      paid: {
        actualPrice: {
          type: Number,
        },
        tip: {
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
