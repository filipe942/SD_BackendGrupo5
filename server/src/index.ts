import express from "express";
import cors from "cors";
import {initTRPC} from "@trpc/server";

const t = initTRPC.create()

t.router({
})

const app = express();
const PORT = 3000;
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});


