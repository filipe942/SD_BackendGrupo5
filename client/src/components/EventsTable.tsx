import React, {useState} from "react";
import "../assets/css/Table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/trpc";

interface Event {
  _id: string;
  local: string;
  date: Date;
  time: string;
  participants: string;
}

interface EventsTableProps {
  events: Event[];
  getData: () => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, getData }) => {
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  const updateEvent = async (event: Event) => {
    const result = await client.UpdateEvent.mutate(event);
    if (result.message === "success") {
      getData();
    }
    else {
      alert("Error updating event");
    }
  }

  const deleteEvent = async (_id: string) => {
    const result = await client.DeleteEvent.mutate({ _id });
    if (result.message === "success") {
      getData();
    }
    else {
      alert("Error deleting event");
    }
  }

  const handleEdit = (event: Event) => {
    setEditEventId(event._id);
    setEditedEvent({ ...event });
  };

  const handleCancel = () => {
    setEditEventId(null);
    setEditedEvent(null);
  };

  const handleSave = () => {
    if (editedEvent) {
      updateEvent(editedEvent);
      // You may want to pass the updatedEvents to a parent component
      // to update the original state, or use a state management library like Redux.
      setEditEventId(null);
      setEditedEvent(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Event
  ) => {
    if (editedEvent) {
      setEditedEvent({
        ...editedEvent,
        [field]: e.target.value,
      });
    }
  };

  const handleDateChange = (date: Date | null, field: keyof Event) => {
    if (editedEvent && date) {
      setEditedEvent({
        ...editedEvent,
        [field]: date,
      });
    }
  };

  const handleTimeChange = (time: string, field: keyof Event) => {
    if (editedEvent) {
      setEditedEvent({
        ...editedEvent,
        [field]: time,
      });
    }
  };

  const handleDelete = (id: string) => {
      deleteEvent(id);
  };

  return (
    <table className="events-table">
      <thead>
        <tr>
          <th>Local</th>
          <th>Date</th>
          <th>Time</th>
          <th>N. Of Participants</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>
              {editEventId === event._id ? (
                <input
                  type="text"
                  value={editedEvent?.local || ""}
                  onChange={(e) => handleChange(e, "local")}
                />
              ) : (
                event.local
              )}
            </td>
            <td>
              {editEventId === event._id && editedEvent ? (
                <DatePicker
                  selected={new Date(editedEvent.date)}
                  onChange={(date) => handleDateChange(date, "date")}
                  dateFormat="dd/MM/yyyy"
                />
              ) : (
                new Date(event.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              )}
            </td>
            <td>
              {editEventId === event._id ? (
                <input
                  type="time"
                  value={editedEvent?.time || ""}
                  onChange={(e) => handleTimeChange(e.target.value, "time")}
                />
              ) : (
                event.time
              )}
            </td>
            <td>
              {editEventId === event._id ? (
                <input
                  type="text"
                  value={editedEvent?.participants || ""}
                  onChange={(e) => handleChange(e, "participants")}
                />
              ) : (
                event.participants
              )}
            </td>
            <td>
              {editEventId === event._id ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
