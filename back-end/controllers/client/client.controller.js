const Client = require("./../../models/client.model");

exports.createClient = async (req, res) => {
  try {
    const { first_name, last_name, number, email } = req.body;
    const newClient = await new Client({
      first_name,
      last_name,
      number,
      email,
    }).save();
    res
      .status(200)
      .json({ client: newClient, message: "New client created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
