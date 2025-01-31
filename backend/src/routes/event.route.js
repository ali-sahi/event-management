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

eventRoute.post("/create_event", createEvent);
eventRoute.get("/get_events", getAllEvents);
eventRoute.post("/join_event", joinEvent);
eventRoute.get("/event_stats", getEventStatistics);
eventRoute.delete("/delete_event", deleteEvent);
eventRoute.post("/change_status", changeEventStatus);

module.exports = eventRoute;
