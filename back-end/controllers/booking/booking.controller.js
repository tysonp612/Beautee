const { findByIdAndDelete } = require("./../../models/bookings.model");
const Bookings = require("./../../models/bookings.model");
const Client = require("./../../models/client.model");
exports.createBooking = async (req, res) => {
  try {
    const {
      client,
      worker,
      date,
      timeBooked,
      duration,
      services,
      price,
      note,
    } = req.body.bookingData;
    const servicesArr = services.map((s) => s._id);

    const booking = await new Bookings({
      client,
      user: worker,
      date,
      period: duration,
      services: { mainService: servicesArr },
      price: { estimatedPrice: price },
      timeOfBooking: timeBooked,
      note,
    }).save();
    res
      .status(200)
      .json({ message: "A reservation has been created successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Create booking failed! Please try again" });
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
        select: "service price",
      })
      .populate({
        path: "services.actualService",
        select: "service price",
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
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
        select: "service",
      })
      .populate({
        path: "services.actualService",
        select: "service",
      })
      .populate({
        path: "price.estimatedPrice",
        select: "price",
      })
      .populate({
        path: "price.actualPrice",
        select: "price",
      });

    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
  }
};
//update bookings for admin
exports.updateBooking = async (req, res) => {
  try {
    const {
      id,
      client,
      worker,
      date,
      timeBooked,
      duration,
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
        timeOfBooking: timeBooked,
        period: duration,
        services: { mainService: servicesArr },
        price: { estimatedPrice: price },
        note,
      },
      { new: true }
    );
    res.status(200).json({ message: "Booking edited successfully!" });
  } catch (err) {
    res
      .status(200)
      .json({ message: "Booking edited failed, please try again!" });
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
      })
      .populate({
        path: "services.actualService",
        select: "service",
      });
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
  }
};
//Update bookings for user
exports.userUpdateBooking = async (req, res) => {
  try {
    const { id, type, value } = req.body;

    if (type === "servicesUpdate" && value.length > 0) {
      const servicesArr = value.map((s) => {
        return s._id;
      });

      const updatedBooking = await Bookings.findByIdAndUpdate(
        id,
        {
          services: { actualService: servicesArr },
        },
        { new: true }
      ).populate({
        path: "services.actualService",
        select: "service",
      });
      res.status(200).json({
        type: "services",
        data: updatedBooking,
        message: "Services updated sucessfully!",
      });
    } else if (type === "periodUpdate") {
      const bookingPeriodUpdate = await Bookings.findByIdAndUpdate(
        id,
        {
          period: value,
        },
        { new: true }
      );
      res.status(200).json({
        type: "duration",
        data: bookingPeriodUpdate,
        message: "Duration updated sucessfully!",
      });
    } else if (type === "priceUpdate") {
      const bookingPriceUpdate = await Bookings.findByIdAndUpdate(
        id,
        {
          price: { actualPrice: value },
        },
        { new: true }
      );

      res.status(200).json({
        type: "price",
        message: "Price updated succesfully!",
        data: bookingPriceUpdate,
      });
    } else if (type === "addMessages") {
      const bookingMessagesUpdate = await Bookings.findByIdAndUpdate(
        id,
        {
          $push: { technicianMessages: value },
        },
        { new: true }
      );

      res.status(200).json({
        type: "message",
        message: "Messages added succesfully!",
        data: bookingMessagesUpdate,
      });
    } else if (type === "calculatingPayingTotal") {
      const bookingUpdatePayingTotal = await Bookings.findByIdAndUpdate(
        id,
        {
          totalPayment: value,
        },
        { new: true }
      );

      res.status(200).json(bookingUpdatePayingTotal.totalPayment);
    }
  } catch (err) {
    res.status(500).json({ message: "Error!, please try again" });
  }
};

exports.sendBookingToAdmin = async (req, res) => {
  try {
    const { id } = req.body;
    const {
      finalPeriod,
      finalServices,
      finalPrice,
      finalMessages,
      initialServices,
    } = req.body.data;

    const servicesArr = finalServices.map((s) => s._id);
    const updateFinalBookingToSend = await Bookings.findByIdAndUpdate(
      id,
      {
        period: finalPeriod,
        status: "Ready",
        services: { actualService: servicesArr, mainService: initialServices },
        price: { actualPrice: finalPrice },
        technicianMessages: finalMessages,
      },
      { new: true }
    );

    res.status(200).json({ message: "Booking sent" });
  } catch (err) {
    console.log(err);
  }
};

exports.closeBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const closeBooking = await Bookings.findByIdAndUpdate(
      id,
      {
        status: "Finished",
      },
      { new: true }
    );
    res.status(200).json("Booking is closed");
  } catch (err) {
    console.log(err);
  }
};
