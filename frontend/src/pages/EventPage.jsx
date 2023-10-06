import { useCallback, useLayoutEffect, useState } from "react";
import EventsList from "../components/EventsList";
const EventPage = () => {
  const [events, setEvents] = useState([]);
  const handleFetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      console.log(error);
      setEvents([]);
    }
  }, []);
  useLayoutEffect(() => {
    handleFetchEvents();
  }, []);
  return <EventsList events={events} />;
};

export default EventPage;
