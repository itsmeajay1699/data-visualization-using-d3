import express from "express";
import { config } from "dotenv";
config();
import indexRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import cors from "cors";
import "./utils/cron-job/cron.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL_DEV,
      process.env.CLIENT_URL_PROD,
      process.env.CLIENT_URL_PROD1,
    ],
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

// const changeStringToJson = async () => {
//   try {
//     const collection = await giveCollection("shopifyOrders");

//     const cursor = collection.find({ line_items: { $type: "string" } });

//     while (await cursor.hasNext()) {
//       const doc = await cursor.next();

//       // Try parsing the string to JSON
//       let parsedLineItems;
//       try {
//         parsedLineItems = JSON.parse(doc.line_items);
//       } catch (err) {
//         console.error("Failed to parse line_items:", err);
//         continue; // Skip this document if parsing fails
//       }

//       // Update the document with the parsed array
//       const result = await collection.updateOne(
//         { _id: doc._id },
//         { $set: { line_items: parsedLineItems } }
//       );

//       console.log(
//         `Updated document with _id: ${doc._id}`,
//         result.modifiedCount
//       );
//     }
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     await client.close();
//   }
// };

// changeStringToJson();
