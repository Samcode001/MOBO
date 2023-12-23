const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const phonesModel = mongoose.model("phones", new mongoose.Schema({}), "phones");

router.get("/phones", async (req, res) => {
  try {
    const phonesData = await phonesModel.find({}).exec();
    if (phonesData) return res.status(200).json({ phones: phonesData });
    res.status(404).send("Data Not Found");
  } catch (error) {
    res.status(500).send(`Error in Route: ${error}`);
  }
});

module.exports = router;
