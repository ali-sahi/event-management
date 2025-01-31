import { Grid2, Paper } from "@mui/material";
import StatCard from "../components/StatCard";
import UserProfile from "../components/UserProfile";
import API from "../config/apiClient";
import { CheckAxiosError } from "../utils/checkAxiosError";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const AdminDashboard = () => {
  const [statData, setStatData] = useState({
    userCount: 0,
    eventsCreated: 0,
  });

  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
  });
  const { user } = useAuth();

  const fetchUserDashboardData = async () => {
    try {
      const responses = await Promise.all([
        API.get("/event/event_stats"),
        API.get("/user/get_users"),
        API.get("/user/get_profile"),
      ]);

      setStatData({
        eventsCreated: responses[0].data.stats.eventsCreated,
        userCount: responses[1].data.allUsers.length,
      });
      setProfileData(responses[2].data.user);
    } catch (error) {
      CheckAxiosError(error);
    }
  };

  useEffect(() => {
    fetchUserDashboardData();
  }, []);
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={6}>
          <Paper sx={{ padding: 0 }}>
            <StatCard label="Total Users" count={statData.userCount} />
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper>
            <StatCard label="Total Events" count={statData.eventsCreated} />
          </Paper>
        </Grid2>

        <Grid2 size={12}>
          <Paper sx={{ padding: "30px" }}>
            <UserProfile {...profileData} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AdminDashboard;
