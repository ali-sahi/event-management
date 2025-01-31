import { useState, useEffect } from "react";
import { Grid2, Pagination } from "@mui/material";
import EventCard from "../../components/EventCard";
import API from "../../config/apiClient";
import { CheckAxiosError } from "../../utils/checkAxiosError";
import Loading from "../../components/Loading";

const AllEvents = () => {
  const [eventsList, setEventList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 2;

  const fetchEvents = async (page = 1) => {
    try {
      setLoading(true);
      const response = await API.get(`/event/get_events?page=${page}&limit=${limit}`);
      setEventList(response.data.eventsList);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      CheckAxiosError(error);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <>
      {loading && <Loading />}
      <Grid2 container spacing={4} sx={{ minHeight: "400px" }}>
        {eventsList.map((item, index) => (
          <Grid2 size={6} key={index}>
            <EventCard {...item} fetchEvents={() => fetchEvents(page)} />
          </Grid2>
        ))}
      </Grid2>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default AllEvents;
