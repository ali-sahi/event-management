const { Router } = require("express");
const {
  createEvent,
  getAllEvents,
  joinEvent,
  getEventStatistics,
  deleteEvent,
  changeEventStatus,
} = require("../controllers/event.controller");

const eventRoute = Router();

// prefix ===== /event

eventRoute.post("/create_event/:userId", createEvent);
eventRoute.get("/get_events", getAllEvents);
eventRoute.post("/join_event", joinEvent);
eventRoute.get("/event_stats/:userId", getEventStatistics);
eventRoute.delete("/delete_event/:userId", deleteEvent);
eventRoute.post("/change_status/:userId", changeEventStatus);

module.exports = eventRoute;
