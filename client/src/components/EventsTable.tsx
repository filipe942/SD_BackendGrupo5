import React, { useState } from "react";
import "../assets/css/Table.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Event {
  id: number;
  local: string;
  date: Date;
  time: string;
  participants: string;
}

const EventsTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      local: "Local 1",
      date: new Date("2023-10-21"),
      time: "02:40",
      participants: "2",
    },
    {
      id: 2,
      local: "Local 2",
      date: new Date("2023-11-11"),
      time: "13:40",
      participants: "6",
    },
  ]);

  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const handleEdit = (event: Event) => {
    setEditEventId(event.id);
    setEditedEvent({ ...event });
  };

  const handleCancel = () => {
    setEditEventId(null);
    setEditedEvent(null);
  };

  const handleSave = () => {
    if (editedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editedEvent.id ? editedEvent : event
      );
      setEvents(updatedEvents);
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

  const handleDelete = (id: number) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    if (editEventId === id) {
      // If the deleted event is currently being edited, cancel the edit
      handleCancel();
    }
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
          <tr key={event.id}>
            <td>
              {editEventId === event.id ? (
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
              {editEventId === event.id ? (
                <DatePicker
                  selected={editedEvent?.date}
                  onChange={(date) => handleDateChange(date, "date")}
                  dateFormat="dd/MM/yyyy"
                />
              ) : (
                event.date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              )}
            </td>
            <td>
              {editEventId === event.id ? (
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
              {editEventId === event.id ? (
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
              {editEventId === event.id ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
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
