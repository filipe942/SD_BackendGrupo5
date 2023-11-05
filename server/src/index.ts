import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./trpc.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Mongodb connected....");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  });
} else {
  console.log("Error: URL undefined");
}

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
