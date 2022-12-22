const User = require("./../../models/user.model");
const Booking = require("./../../models/bookings.model");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTipAndWage = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const bookingDate = booking.date;
    const actualPrice = booking.price.actualPrice;
    const totalPayment = booking.totalPayment;
    const tip = totalPayment - actualPrice;

    const updateUserTip = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          dailyRecord: {
            money: (actualPrice * 60) / 100,
            tip: tip,
            date: bookingDate,
            booking: bookingId,
          },
        },
      },
      { new: true }
    );
    const updateUserFinishedBookings = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          finishedBookings: bookingId,
        },
      },
      { new: true }
    );
    res.status(200).json("Nail technician's wages in tip updated successfully");
  } catch (err) {
    console.log(err);
  }
};
