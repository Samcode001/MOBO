import express from "express";
import mongoose from "mongoose";
import PHONES from "../models/phones.js";
import RATINGS from "../models/ratings.js";
import authenticateJwt from "../auth/authenticateJwt.js";
const router = express.Router();

// const phonesModel = mongoose.model("phones", new mongoose.Schema({}), "phones");

router.get("/phones", async (req, res) => {
  try {
    // const phonesData = await phonesModel.find({}).exec();
    const phonesData = await PHONES.find({});
    // console.log(phonesData)
    if (phonesData) return res.status(200).json({ phones: phonesData });
    res.status(404).send("Data Not Found");
  } catch (error) {
    res.status(500).send(`Error in Route: ${error}`);
  }
});

router.post("/set-rating", authenticateJwt, async (req, res) => {
  try {
    const { id, rate, title, desc } = { ...req.body };
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    const product = await RATINGS.findOne({ productId: id });
    if (!product) {
      const newProduct = RATINGS({
        productId: id,
        ratings: [
          {
            rate: rate,
            title: title,
            description: desc,
            user: "Sam",
            date: date,
          },
        ],
      });

      await newProduct.save();
      res.status(200).send("Rating set");
    } else {
      const newrating = {
        rate: rate,
        title: title,
        description: desc,
        user: "Sam",
        date: date,
      };

      product.ratings.push(newrating);
      await RATINGS.findOneAndUpdate({ productId: id }, product, { new: true });
      res.status(200).send("Rating updated");
    }
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});

router.post("/ratings", async (req, res) => {
  try {
    const product = await RATINGS.findOne({ productId: req.body.id });
    if (product) res.status(200).json({ ratings: product.ratings });
    else res.status(200).json({ ratings: 0 });
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});

export default router;
