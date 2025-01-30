const { Router } = require("express");
const { createEvent, getAllEvents, joinEvent, getEventStatistics } = require("../controllers/event.controller");

const eventRoute = Router();

// prefix ===== /event

eventRoute.post("/create_event/:userId", createEvent);
eventRoute.get("/get_events", getAllEvents);
eventRoute.post("/join_event", joinEvent);
eventRoute.get("/event_stats/:userId", getEventStatistics);

module.exports = eventRoute;
