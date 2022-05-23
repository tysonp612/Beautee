const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const cors = require("cors");
dotenv.config();
app.use(express.json());
//route
app.get("/", (req, res) => {
  res.send("welcome from home");
});
// readdirSync("./routes").map((r) =>
//   app.use("/api", require(`./routes/${r}/${r}.route`))
// );
//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
