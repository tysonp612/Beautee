const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const salonSchema = mongoose.Schema({
  finishedBookings: [
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
      date: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Salon", salonSchema);
