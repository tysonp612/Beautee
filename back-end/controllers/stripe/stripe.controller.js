const Booking = require("./../../models/bookings.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.createPaymentIntent = async (req, res) => {
  //1 find Booking
  const booking = await Booking.findOne({ _id: req.body.bookingId });
  //2 get total amount
  let totalAmountPay = booking.totalPayment;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmountPay * 100,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
