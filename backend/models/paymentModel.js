import { pool } from "../config/db.js";

export const createPaymentRecord = async (userId, orderId, amount) => {
  await pool.query(
    "INSERT INTO payments (user_id, razorpay_order_id, amount) VALUES (?, ?, ?)",
    [userId, orderId, amount],
  );
};

export const markAsPaid = async (orderId, paymentId) => {
  await pool.query(
    "UPDATE payments SET status='paid', razorpay_payment_id=? WHERE razorpay_order_id=?",
    [paymentId, orderId],
  );

  await pool.query(
    "UPDATE users SET subscription_type='premium' WHERE id = (SELECT user_id FROM payments WHERE razorpay_order_id=?)",
    [orderId],
  );
};
