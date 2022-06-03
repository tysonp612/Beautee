const Services = require("./../../models/services.model");

exports.createService = async (req, res) => {
  try {
    const { newService, price } = req.body.serviceData;
    console.log(newService, price);
    const service = await new Services({
      service: newService,
      price,
    }).save();
    console.log(service);
    res.status(200).json({ service: service, message: "Service created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
