import authenticateJwt from "../auth/authenticateJwt.js";
import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controller/paymentController.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { config } from "dotenv";

config({ path: "./config/config.env" });

const stripe = new Stripe(process.env.stripe_Private_Key);

router.post("/stripePayment", authenticateJwt, async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/paymentsuccess`,
    cancel_url: "http://localhost:5173/checkout",
  });

  res.json({ id: session.id });
});

router.post("/paymentsuccess", async (req, res) => {
  const { session_id } = req.body;

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status === "paid") {
    res.send("Payment Successful!");
  } else {
    res.send("Payment Failed.");
  }
});

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = instance.webhooks.constructEvent(
//         request.body,
//         sig,
//         process.env.stripe_endpoint_secret
//       );
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     console.log(response);
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

router.post("/checkout", authenticateJwt, checkout);
router.post("/paymentVerification", paymentVerification);

export default router;
