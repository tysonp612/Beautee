const Services = require("./../../models/services.model");

exports.createService = async (req, res) => {
  try {
    const { service, price } = req.body;
    const newService = await new Services({
      service,
      price,
    }).save();
    res.status(200).json({ service: newService, message: "Service created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
