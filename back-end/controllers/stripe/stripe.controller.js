const Booking = require("./../../models/bookings.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.createPaymentIntent = async (req, res) => {
  //1 find Booking
  console.log("HAHAHAH");
  res.status(200).json("hehehe");
  //   const booking = await Booking.findOne({ id: req.data._id });
  //   //2 get total amount
  //   let totalAmountPay = booking.price.actualPrice;
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: totalAmountPay * 100,
  //     currency: "usd",
  //   });
  //   res.send({
  //     clientSercret: paymentIntent.client_secret,
  //   });
};
