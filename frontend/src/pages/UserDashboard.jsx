import { Grid2, Paper } from "@mui/material";
import StatCard from "../components/StatCard";
import UserProfile from "../components/UserProfile";
import API from "../config/apiClient";
import toast from "react-hot-toast";
import { CheckAxiosError } from "../utils/checkAxiosError";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const UserDashboard = () => {
  const [statData, setStatData] = useState({
    eventsCreated: 0,
    eventsJoined: 0,
  });

  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
  });
  const { user } = useAuth();

  const fetchUserDashboardData = async () => {
    try {
      const responses = await Promise.all([
        API.get(`/event/event_stats/${user._id}`),
        API.get(`/user/get_profile/${user._id}`),
      ]);
      console.log("ressssssss", responses);
      setStatData(responses[0].data.stats);
      setProfileData(responses[1].data.user);

      toast.success(JSON.stringify("Dashboard Loaded"));
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
            <StatCard label="Events Created" eventCount={statData.eventsCreated} />
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper>
            <StatCard label="Events Joined" eventCount={statData.eventsJoined} />
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

export default UserDashboard;
