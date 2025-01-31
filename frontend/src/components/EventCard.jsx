/* eslint-disable react/prop-types */
import {
  AlternateEmail,
  CardMembership,
  LocalPhone,
  LockClock,
  MilitaryTech,
  OutletOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import dayjs from "dayjs";
import { useAuth } from "../providers/AuthProvider";
import API from "../config/apiClient";
import toast from "react-hot-toast";
import { CheckAxiosError } from "../utils/checkAxiosError";
const EventCard = ({ eventTitle, eventDate, joinedUsers, fetchEvents, ...eventMetaData }) => {
  const { user } = useAuth();

  const isUserJoined = joinedUsers && joinedUsers.includes(user._id);

  const joinEventHandler = async () => {
    try {
      const response = await API.post("/event/join_event", {
        eventId: eventMetaData._id,
      });

      toast.success(response.data.message);
      fetchEvents();
    } catch (error) {
      CheckAxiosError(error);
    }
  };
  return (
    <Card>
      <CardHeader title={eventTitle} subheader={dayjs(eventDate).format("DD MMM, YYYY")} />
      <Divider />

      <CardContent>
        <List>
          <CustomListItem {...eventMetaData} joinEventHandler={joinEventHandler} />
        </List>
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end", padding: "15px" }}
        onClick={joinEventHandler}
      >
        <Button variant="contained" disabled={isUserJoined}>
          {isUserJoined ? "Joined" : "Join"}
        </Button>
      </CardActions>
    </Card>
  );
};

const CustomListItem = ({ speakerName, speakerEmail, speakerPhone, speakerDesignation, eventTime }) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <LockClock />
        </ListItemIcon>
        <ListItemText primary={dayjs(eventTime).format("h:mm A")} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <CardMembership />
        </ListItemIcon>
        <ListItemText primary={speakerName} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <AlternateEmail />
        </ListItemIcon>
        <ListItemText primary={speakerEmail} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <LocalPhone />
        </ListItemIcon>
        <ListItemText primary={speakerPhone} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <MilitaryTech />
        </ListItemIcon>
        <ListItemText primary={speakerDesignation} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon>
          <OutletOutlined />
        </ListItemIcon>
        <ListItemText primary={"asjkdajksda"} />
      </ListItem>
    </>
  );
};

export default EventCard;
