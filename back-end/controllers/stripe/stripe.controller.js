const Booking = require("./../../models/bookings.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.createPaymentIntent = async (req, res) => {
  console.log(req);
  const totalAmountPay = req.body.totalPayment;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmountPay * 100,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
