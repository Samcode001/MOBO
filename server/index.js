import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.js";
import dataRoutes from "./routes/phones.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import { config } from "dotenv";
import Razorpay from "razorpay";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authenticateJwt from "./auth/authenticateJwt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
config({ path: "./config/config.env" });

app.use("/admin", adminRoutes);
app.use("/data", dataRoutes);
app.use("/cart", cartRoutes);
app.use("/payments", paymentRoutes);
app.use("/wishlist", wishListRoutes);

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

app.get("/getRazorkey", authenticateJwt, (req, res) => {
  res.status(200).json({ key: process.env.razoarpay_api_id });
});

app.get("/getStripekey", authenticateJwt, (req, res) => {
  res.status(200).json({ key: process.env.stripe_Public_key });
});


