import { useState } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/trpc";

const Form = () => {
  const [inputs, setInputs] = useState({
    local: "",
    date: new Date(),
    time: "",
    participants: "",
  });

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  const getData = async () => {
    //const result = await client.sayHi.query();
    const result = await client.CreateEvent.mutate(inputs);
    console.log(result);
  };

  const getDateString = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0]
      : "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "date") {
      const dateValue = value ? new Date(value + "T00:00:00") : new Date();
      setInputs((prevInputs) => ({ ...prevInputs, [name]: dateValue }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      !inputs.local.trim() ||
      !inputs.date ||
      !inputs.time.trim() ||
      !inputs.participants
    ) {
      alert("Please fill in all fields.");
      return;
    }

    //DEBUG
    alert(JSON.stringify(inputs));

    //Reset fields
    setInputs({
      local: "",
      date: new Date(),
      time: "",
      participants: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">Insert Event</div>
      <label>
        Local: <br />
        <input
          type="text"
          name="local"
          value={inputs.local || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Date <br />
        <input
          type="date"
          name="date"
          value={getDateString(inputs.date)}
          onChange={handleChange}
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </label>
      <label>
        Time: <br />
        <input
          type="time"
          name="time"
          value={inputs.time || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Participants: <br />
        <input
          type="number"
          min="1"
          name="participants"
          value={inputs.participants || ""}
          onChange={handleChange}
        />
      </label>{" "}
      <br />
      <input
        onClick={getData}
        type="submit"
        value="Submit"
        className="sweep-button"
      />
    </form>
  );
};

export default Form;
