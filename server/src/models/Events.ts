import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  local: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
});

export const Events = mongoose.model("Events", eventSchema);

