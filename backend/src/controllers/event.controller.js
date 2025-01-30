const { OK } = require("../constants/httpStatusCode");
const EventModel = require("../models/event.model");
const { errorHandler } = require("../utils/errorHandler");
const { eventSchema } = require("../schemas/event.schema");

module.exports = {
  createEvent: async (req, res) => {
    try {
      console.log("event values", req.body);
      const { userId } = req.params;

      console.log(userId);

      const { eventDate, eventTime, ...otherData } = req.body;

      const parsedDate = new Date(eventDate);
      const parsedTime = new Date(eventTime);

      const validatedData = eventSchema.parse({
        eventDate: parsedDate,
        eventTime: parsedTime,
        ...otherData,
      });

      await EventModel.create({ userId, ...validatedData });

      res.status(OK).json({ message: "Event Created" });
    } catch (error) {
      errorHandler(res, error, "Error Creating Event");
    }
  },
  getAllEvents: async (req, res) => {
    try {
      const eventsList = await EventModel.find();
      res.status(OK).json({ message: "Event Created", eventsList });
    } catch (error) {
      errorHandler(res, error, "Error retrieving list of  Event");
    }
  },
  joinEvent: async (req, res) => {
    try {
      console.log("data", req.body);

      const { userId, eventId } = req.body;

      const updateEvent = await EventModel.findByIdAndUpdate(eventId, {
        $push: { joinedUsers: userId },
      });

      res.status(OK).json({ message: "Event Joined" });
    } catch (error) {
      errorHandler(res, error, "Error Joining Event");
    }
  },
  getEventStatistics: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("data", userId);

      const allEvents = await EventModel.find();

      const eventsCreated = allEvents.filter((item) => {
        console.log("asdada", item.userId);
        return item.userId.toString() === userId;
      });
      const eventsJoined = allEvents.filter((item) => {
        const { joinedUsers } = item;
        return joinedUsers.includes(userId);
      });

      console.log("created", eventsCreated.length);
      console.log("joined", eventsJoined.length);

      res
        .status(OK)
        .json({
          message: "Stats Returned",
          stats: { eventsCreated: eventsCreated.length, eventsJoined: eventsJoined.length },
        });
    } catch (error) {
      errorHandler(res, error, "Error Joining Event");
    }
  },
};
