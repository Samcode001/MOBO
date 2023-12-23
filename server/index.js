const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const dataRoutes = require("./routes/phones");

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/data", dataRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect("mongodb://localhost:27017/MOBO")
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));
