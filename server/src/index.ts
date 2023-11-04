import express from "express";
import cors from "cors";
import {initTRPC} from "@trpc/server";

const t = initTRPC.create()

t.router({
})

const app = express();
const PORT = 3000;
app.use(cors({ origin: "http://localhost:5173" }));
console.log("asdasdsdssd");
app.get("/as", (req, res) => {
  res.send("Hello Worsdld!");
});
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + ".s.asd.");
});


