import EventsTable from "../components/EventsTable";
import { useLayoutEffect, useState } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/trpc";

interface Event {
  _id: string;
  local: string;
  date: Date;
  time: string;
  participants: string;
}

const ViewEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useLayoutEffect(() => {
    getData();
  }, []);

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  const getData = async () => {
    const result = await client.GetEventList.query();
    //console.log(result);
    setEvents(result as Event[]);
  };

  return <EventsTable events={events} getData={getData} />;
};

export default ViewEvents;
