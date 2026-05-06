import Razorpay from "razorpay";
import crypto from "crypto";
import { createPaymentRecord, markAsPaid } from "../models/paymentModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    console.log("KEY:", process.env.RAZORPAY_KEY);
    console.log("SECRET:", process.env.RAZORPAY_SECRET);
    const options = {
      amount: 50000, // ₹500
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    await createPaymentRecord(req.user.id, order.id, options.amount);

    res.json({
      message: "Order created",
      data: order,
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    await markAsPaid(razorpay_order_id, razorpay_payment_id);

    res.json({ message: "Payment verified → Premium activated" });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
