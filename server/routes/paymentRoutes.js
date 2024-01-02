import authenticateJwt from "../auth/authenticateJwt.js";
import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controller/paymentController.js";
const router = express.Router();

router.post("/checkout", authenticateJwt, checkout);
router.post("/paymentVerification", authenticateJwt, paymentVerification);

export default router;
