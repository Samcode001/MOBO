import express from "express";
import authenticateJwt from "../auth/authenticateJwt.js";
import ORDER from "../models/order.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

router.post("/order", authenticateJwt, async (req, res) => {
  try {
    const user = req.headers["user"].admin;
    const { order, total } = req.body;
    const orderId = uuidv4();
    const currentDate = new Date();
    const currenDateForamt = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const timeForamt = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const dateFormat = `${currenDateForamt} ${timeForamt}`;

    const userExist = await ORDER.findOne({ user: user });

    if (!userExist) {
      const newOrder = new ORDER({
        user: user,
        orders: [
          {
            orderId: orderId,
            date: dateFormat,
            order: order,
            total: total,
          },
        ],
      });

      await newOrder.save();

      res.status(200).json({ message: "Order created", success: true });
    } else {
      const newOrder = {
        orderId: orderId,
        date: dateFormat,
        order: order,
        total: total,
      };

      //   userExist.orders.push(newOrder);

      const addOrder = await ORDER.findOneAndUpdate(
        { user: user },
        { $push: { orders: newOrder } }, // will push the newOrder data to the orders array
        { new: true }
      );
      res.status(201).json({ message: "Order added", success: true });
    }
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});

router.get("/order", authenticateJwt, async (req, res) => {
  try {
    const user = req.headers["user"].admin;

    const orders = await ORDER.findOne({ user: user });

    if (orders) {
      res.status(200).json({ success: true, orders });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});

export default router;
