import express from "express";
import { config } from "dotenv";
import indexRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import cors from "cors";
config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL_DEV,
  })
);

connectDB();
//routes
app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
