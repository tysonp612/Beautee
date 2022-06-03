const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const servicesSchema = new mongoose.Schema({
  service: {
    type: String,
    trim: true,
    required: [true, "Service name is required"],
  },
  price: {
    type: Number,
    required: [true, "Each service must have a price"],
  },
});

module.exports = mongoose.model("Services", servicesSchema);
