const User = require("./../../models/user.model");
const Bookings = require("./../../models/bookings.model");
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

exports.calculateTotalMoney = async (req, res) => {
  //0.Extract id and date from req.body
  const { userId } = req.body;
  const propDate = req.body.date;
  //1.Find the user with passed id
  const user = await User.findById(userId);
  let sumMoney = 0;
  let sumTip = 0;
  //4. take the array from step 3, then loop throught it, find the money property then add up
  //This function will take an array of transactions in passed day and calculate the sum of tip and money
  const sumTotalByDate = (arr) => {
    arr.forEach((el) => {
      sumMoney += el.money;
      sumTip += el.tip;
    });
  };
  //3.with the date (type string) passed in, it will look at the user.dailyRecord array, and filter the array with the date given
  const filterByDate = (dateToFind) => {
    const dailyRecordArr = user.dailyRecord.filter((el) => {
      return el.date.includes(dateToFind);
    });
    //pass the object to step 4
    sumTotalByDate(dailyRecordArr);
  };
  //2.check the prop dates, if they are type of array or not
  if (Array.isArray(propDate)) {
    //iff it is an array, loop through and for each of them send the date to filterByDate
    const filterDateArr = propDate.forEach((el) => filterByDate(el));
    res.status(200).json({ totalMoney: sumMoney, totalTip: sumTip });
  } else {
    filterByDate(propDate);
    res.status(200).json({ totalMoney: sumMoney, totalTip: sumTip });
  }
};

//get all finished bookings as technician requires
const getFinishedBookingsTechnician = async (req, res) => {
  //0.get user id from req.body
  const { userId } = req.body;
  //1. get all bookings with user === userId, then send back to FE
  const bookings = await Bookings.find({ user: userId, status: "Finished" })
    .populate({
      path: "client",
      select: "first_name last_name",
    })
    .populate({
      path: "user",
      select: "username color",
    })
    .populate({
      path: "services.mainService",
      select: "service",
    })
    .populate({
      path: "services.actualService",
      select: "service",
    })
    .sort({ date: -1 });
  res.status(200).json(bookings);
};
// calculateTotalMoney("629a52f3cf6f57d2bd949a06", [
//   "Thu Dec 22 2022",
//   "Fri Dec 23 2022",
// ]);
// calculateTotalMoney("629a52f3cf6f57d2bd949a06", "Fri Dec 23 2022");
// getFinishedBookingsTechnician("629a52f3cf6f57d2bd949a06");
