const { findByIdAndDelete } = require("./../../models/bookings.model");
const Bookings = require("./../../models/bookings.model");
const Client = require("./../../models/client.model");
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
    const servicesArr = services.map((s) => s._id);

    const booking = await new Bookings({
      client,
      user: worker,
      date,
      period,
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

exports.getAllBookings = async (req, res) => {
  try {
    const { date } = req.body;
    const bookings = await Bookings.find({ date })
      .populate({
        path: "client",
        select: "first_name last_name number",
      })
      .populate({
        path: "user",
        select: "username color",
      })
      .populate({
        path: "services.mainService",
        select: "service",
      });
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteBooking = await Bookings.findByIdAndDelete(id);
    res.status(200).json(null);
  } catch (err) {
    console.log(err);
  }
};
exports.getOneBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const booking = await Bookings.findById(id)
      .populate({
        path: "client",
        select: "first_name last_name number",
      })
      .populate({
        path: "user",
        select: "username color",
      })
      .populate({
        path: "services.mainService",
        select: "service price",
      })
      .populate({
        path: "services.actualService",
        select: "service price",
      });
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
  }
};
exports.updateBooking = async (req, res) => {
  try {
    const {
      id,
      client,
      worker,
      date,
      time,
      period,
      services,
      price,
      note,
    } = req.body.bookingData;
    const servicesArr = services.map((s) => s._id);

    const updatedBooking = await Bookings.findByIdAndUpdate(
      id,
      {
        client,
        user: worker,
        date,
        timeOfBooking: time,
        period,
        services: { mainService: servicesArr },
        price: { estimatedPrice: price },
        note,
      },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log(err);
  }
};

exports.loadUserBookings = async (req, res) => {
  try {
    const { id } = req.body;
    const { date } = req.body;
    const bookings = await Bookings.find({ user: id, date })
      .populate({
        path: "client",
        select: "first_name last_name number",
      })
      .populate({
        path: "user",
        select: "username color",
      })
      .populate({
        path: "services.mainService",
        select: "service",
      });
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
  }
};

exports.userUpdateBooking = async (req, res) => {
  try {
    const { id, type, value } = req.body;

    if (type === "servicesUpdate" && value.length > 0) {
      const servicesArr = value.map((s) => {
        return s._id;
      });
      console.log(servicesArr);
      const updatedBooking = await Bookings.findByIdAndUpdate(
        id,
        {
          services: { mainService: servicesArr },
        },
        { new: true }
      ).populate({
        path: "services.mainService",
        select: "service price",
      });
      res.status(200).json(updatedBooking);
    } else if (type === "periodUpdate") {
      const bookingPeriodUpdate = await Bookings.findByIdAndUpdate(
        id,
        {
          period: value,
        },
        { new: true }
      );
      res.status(200).json("Booking period updated successfully!");
    } else if (type === "priceUpdate") {
    }
  } catch (err) {
    console.log(err);
  }
};
