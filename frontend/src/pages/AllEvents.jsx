import { useEffect, useState } from "react";
import API from "../config/apiClient";
import { CheckAxiosError } from "../utils/checkAxiosError";
import toast from "react-hot-toast";
import { Box, Grid2 } from "@mui/material";
import EventCard from "../components/EventCard";

const AllEvents = () => {
  const [data, setData] = useState([]);
  const fetchEvents = async () => {
    try {
      const response = await API.get("/event/get_events");
      setData(response.data.eventsList);
      toast.success("Events Loaded");
    } catch (error) {
      CheckAxiosError(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      {/* <Box>{JSON.stringify(data)}</Box> */}

      <Grid2 container spacing={4}>
        {data.map((item, index) => (
          <Grid2 size={6} key={index}>
            <EventCard {...item} fetchEvents={fetchEvents} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default AllEvents;
