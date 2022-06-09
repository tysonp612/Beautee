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
    let client;
    const terms = keyword.split(" ");

    let regexString = "";

    for (let i = 0; i < terms.length; i++) {
      regexString += terms[i];
      if (i < terms.length - 1) regexString += "|";
    }
    const re = new RegExp(regexString, "ig");

    const nameCheck = await Client.aggregate()
      .project({ fullName: { $concat: ["$first_name", " ", "$last_name"] } })
      .match({
        fullName: re,
      });
    if (nameCheck.length > 0) {
      console.log("name", nameCheck);
    } else {
      const keywordCheck = await Client.find({
        $or: [{ number: { $regex: keyword } }, { email: { $regex: keyword } }],
      });
      console.log("keyword", keywordCheck);
    }

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
