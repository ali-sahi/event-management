import { Grid2 } from "@mui/material";
import EventCard from "../components/EventCard";
import { useFetchEvents } from "../hooks/useFetchEvents";

const AllEvents = () => {
  const { eventsList, fetchEvents } = useFetchEvents();
  return (
    <Grid2 container spacing={4}>
      {eventsList.map((item, index) => (
        <Grid2 size={6} key={index}>
          <EventCard {...item} fetchEvents={fetchEvents} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default AllEvents;
