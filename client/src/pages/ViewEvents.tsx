import EventsTable from "../components/EventsTable";
import { useLayoutEffect } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/trpc";

const ViewEvents = () => {
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
    console.log(result);
  };

  return <EventsTable />;
};

export default ViewEvents;
