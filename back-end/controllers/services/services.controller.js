const Services = require("./../../models/services.model");

exports.createService = async (req, res) => {
  try {
    const { name, price } = req.body.serviceData;
    const service = await new Services({
      service: name,
      price,
    }).save();
    res.status(200).json({ service: service, message: "Service created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({ services: services });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
