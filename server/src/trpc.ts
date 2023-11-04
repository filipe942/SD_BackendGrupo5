import { initTRPC } from "@trpc/server";
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
  })

  
});

export type AppRouter = typeof appRouter;
