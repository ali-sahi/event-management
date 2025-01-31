import { useEffect, useState } from "react";
import API from "../config/apiClient";
import { CheckAxiosError } from "../utils/checkAxiosError";

export const useFetchEvents = () => {
  const [eventsList, setEventList] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/event/get_events");
      setEventList(response.data.eventsList);
    } catch (error) {
      CheckAxiosError(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return { eventsList, fetchEvents };
};
