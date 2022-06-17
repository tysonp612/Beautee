const Bookings = require("./../../models/bookings.model");

exports.createBooking = async (req, res) => {
  try {
    const {
      client,
      worker,
      date,
      time,
      period,
      service,
      price,
      note,
    } = req.body.bookingData;
    const servicesArr = service.map((s) => s._id);
    console.log(servicesArr);
    const booking = await new Bookings({
      client,
      user: worker,
      date,
      services: { mainService: servicesArr },
      price: { estimatedPrice: price },
      timeOfBooking: time,
      note,
    }).save();
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
  }
};
