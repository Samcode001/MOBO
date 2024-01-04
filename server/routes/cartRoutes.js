import express from "express";
const router = express.Router();
import authenticateJwt from "../auth/authenticateJwt.js";
import CART from "../models/cart.js";
import { send } from "vite";

router.post("/addItem", authenticateJwt, async (req, res) => {
  try {
    const { name, img, price, os, memory, type } = req.body;
    const user = req.headers["user"].admin;
    const item = await CART.findOne({ name: name });
    if (item)
      return res
        .status(201)
        .json({ success: false, message: "Item Already Added" });

    const newItem = CART({
      name: name,
      price: price,
      img: img,
      type: type,
      os: os,
      memory: memory,
      user: user,
    });

    await newItem.save();
    res.status(200).json({ success: true, message: "Item Added" });
  } catch (error) {
    res.status(500).send(`Error In Route :${error}`);
  }
});

router.get("/getItems", authenticateJwt, async (req, res) => {
  try {
    const user = req.headers["user"].admin;
    const cartItems = await CART.find({ user: user });
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).send(`Error  in Route:${error}`);
  }
});

router.post("/removeItem", authenticateJwt, async (req, res) => {
  const { id } = req.body;
  const item = await CART.findOneAndDelete({ _id:id });
  if (!res) return res.status(401).send("Item Not FOund");

  res.status(201).send("ItemDeleted");
});

export default router;
