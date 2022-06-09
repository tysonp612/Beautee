const Client = require("./../../models/client.model");

exports.createClient = async (req, res) => {
  try {
    const { first_name, last_name, number, email } = req.body.clientData;
    const newClient = await new Client({
      first_name,
      last_name,
      number,
      email,
    }).save();

    res.status(200).json({
      first_name: newClient.first_name,
      last_name: newClient.last_name,
      number: newClient.number,
      email: newClient.email,
      message: "New client created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findClient = async (req, res) => {
  try {
    const { keyword } = req.body;
    const client = await Client.find(
      {
        $text: { $search: keyword },
      },
      (err, doc) => {
        console.log(err);
      }
    );
    console.log(keyword, client);
    if (client) {
      return res.status(200).json({ client: client });
    } else {
      return res.status(500).json({ message: "No client found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
