import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.js";
import dataRoutes from "./routes/phones.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from './routes/cartRoutes.js'
import wishListRoutes from './routes/wishListRoutes.js'
import { config } from "dotenv";
import Razorpay from "razorpay";

app.use(cors());
app.use(express.json());
config({ path: "./config/config.env" });

app.use("/admin", adminRoutes);
app.use("/data", dataRoutes);
app.use('/cart',cartRoutes);
app.use("/payments", paymentRoutes);
app.use('/wishlist',wishListRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(process.env.mongoString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

export const instance = new Razorpay({
  key_id: process.env.razoarpay_api_id,
  key_secret: process.env.razorpay_api_key,
});

app.get("/getkey", (req, res) => {
  res.status(200).json({ key: process.env.razoarpay_api_id });
});
