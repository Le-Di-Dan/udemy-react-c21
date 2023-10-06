import { useCallback, useEffect, useState } from "react";
import EventItem from "../components/EventItem";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const [eventDetail, setEventDetail] = useState({});
  const $params = useParams();
  const handleFetchEventDetail = useCallback(async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setEventDetail(data.event);
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      console.log(error);
      setEventDetail({});
    }
  }, []);
  useEffect(() => {
    handleFetchEventDetail($params.id);
  }, [$params]);
  return <EventItem event={eventDetail} />;
};

export default EventDetailPage;
