import { TRPCError, initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();
import { Events } from "../models/Events.ts";

export const appRouter = t.router({
  CreateEvent: t.procedure
    .input(
      z.object({
        local: z.string(),
        date: z.coerce.date(),
        time: z.string(),
        participants: z.string(),
      })
    )
    .mutation(async (req) => {
      console.log(`Recebido : ${JSON.stringify(req.input)}`);
      console.log(req.input.date);
      const event = new Events({
        local: req.input.local,
        date: req.input.date,
        time: req.input.time,
        participants: req.input.participants,
      });
      await event.save();
    }),

  GetEventList : t.procedure.query( async ()=>{
    const allEvents = await Events.find();
    return allEvents;
  }),

  UpdateEvent: t.procedure.input(z.object({
    _id: z.string(),
    local: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    participants: z.string(),
  })).mutation(async (req) => {
    console.log(`Recebido : ${JSON.stringify(req.input)}`);
    try {
      const event = await Events.findByIdAndUpdate(req.input._id, {
        local: req.input.local,
        date: req.input.date,
        time: req.input.time,
        participants: req.input.participants,
      });
      if (event) {
        return { message: "success" };
      } else {
        return new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }
    } catch (error) {
      return new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error updating event" });
    }
  }),

  DeleteEvent: t.procedure.input(z.object({
    _id: z.string(),
  })).mutation(async (req) => {
    console.log(`Recebido : ${JSON.stringify(req.input)}`);
    try {
    const event = await Events.findByIdAndDelete(req.input._id);
    if (event) {
      return { message: "success" };
    } else {
      return new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
    }
  } catch (error) {
    return new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error deleting event" });
  }
  }),
});

export type AppRouter = typeof appRouter;
