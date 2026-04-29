import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.json({ message: "Jobify API is live!" });
});

// starting our server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening from port " + PORT);
});
