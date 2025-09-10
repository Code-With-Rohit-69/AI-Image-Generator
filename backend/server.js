import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.js";
import imageRouter from "./routes/image.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://imagify-omega-eight.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is working.");
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/payment", paymentRouter);

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
  });

  connectDB();
};

start();
