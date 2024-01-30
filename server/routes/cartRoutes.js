import express from "express";
const router = express.Router();
import authenticateJwt from "../auth/authenticateJwt.js";
import CART from "../models/cart.js";

router.post("/addItem", authenticateJwt, async (req, res) => {
  try {
    const { name, img, price, os, memory, quantity, type } = req.body;
    const user = req.headers["user"].admin;
    const userExist = await CART.findOne({ user: user });

    const newItem = {
      name: name,
      price: price,
      img: img,
      type: type,
      os: os,
      quantity: quantity,
      memory: memory,
    };

    if (!userExist) {
      const newUserCart = CART({
        user: user,
        cart: [newItem],
      });
      await newUserCart.save();
    } else {
      const itemPresent = userExist.cart.find((elem) => elem.name === name);
      if (itemPresent)
        return res
          .status(201)
          .json({ success: false, message: "Item Already Added" });
      userExist.cart.push(newItem);
      await CART.findOneAndUpdate({ user: user }, userExist, { new: true });
    }

    res.status(200).json({ success: true, message: "Item Added" });
  } catch (error) {
    res.status(500).send(`Error In Route :${error}`);
  }
});

router.get("/getItems", authenticateJwt, async (req, res) => {
  try {
    const user = req.headers["user"].admin;
    const userCart = await CART.findOne({ user: user });
    res.status(200).json({ cartItems: userCart.cart });
  } catch (error) {
    res.status(500).send(`Error  in Route:${error}`);
  }
});

router.post("/removeItem", authenticateJwt, async (req, res) => {
  const { name } = req.body;
  const user = req.headers["user"].admin;
  const userCart = await CART.findOne({ user: user });

  let cart = userCart.cart;

  const updatedCart = cart.filter((elem) => elem.name !== name);
  userCart.cart.length = 0;
  userCart.cart = updatedCart;
  await CART.findOneAndUpdate({ user: user }, userCart, { new: true });

  res.status(201).send("ItemDeleted");
});

router.post("/updateQuantity", authenticateJwt, async (req, res) => {
  try {
    const { updateQuantity, productName } = req.body;
    if (updateQuantity === 0 || updateQuantity === 11) {
      return res.status(401).send("Not allowed");
    }

    const user = req.headers["user"].admin;
    const userCart = await CART.findOne({ user: user });

    userCart.cart.forEach((item) => {
      if (item.name === productName) {
        item.quantity = updateQuantity;
      }
    });
    await CART.findOneAndUpdate({ user: user }, userCart, { new: true });

    res
      .status(201)
      .json({ message: "Cart Update successfully", updatedCart: userCart });
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});

router.delete("/clear", authenticateJwt, async (req, res) => {
  try {
    const user = req.headers["user"].admin;

    const result = await CART.findOneAndDelete({ user: user });

    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Cart Cleared Succesfully" });
    } else {
      res.status(404).json({ success: false, message: "Not FOund" });
    }
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});
export default router;
