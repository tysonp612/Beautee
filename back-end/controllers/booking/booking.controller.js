const Booking = require("./../../models/bookings.model");

exports.createBooking = async (req, res) => {
  try {
    const {
      client,
      worker,
      date,
      time,
      period,
      services,
      price,
      note,
    } = req.body.bookingData;
    const servicesArr = services.map((service) => service._id);
    const booking = await new Boookings({
      client,
      user: worker,
      date,
      services: servicesArr,
      price: { estimatedPrice: price },
      timeOfBooking: time,
      note,
    });
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
  }
};
