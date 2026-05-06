import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Debug DB connection
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("DB Connected");
    conn.release();
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
})();