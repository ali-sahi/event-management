const { OK, UNAUTHORIZED } = require("../constants/httpStatusCode");
const EventModel = require("../models/event.model");
const UserModel = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");
const { eventSchema } = require("../schemas/event.schema");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const { userId } = req;

      const isUser = await UserModel.isUser(userId);

      if (!isUser) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

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
      const { userId } = req;

      console.log(userId);

      const isUser = await UserModel.isUser(userId);
      const isAdmin = await UserModel.isAdmin(userId);

      if (isUser || isAdmin) {
        const eventsList = await EventModel.find();
        return res.status(OK).json({ message: "Event Created", eventsList });
      }

      return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
    } catch (error) {
      errorHandler(res, error, "Error retrieving list of  Event");
    }
  },
  joinEvent: async (req, res) => {
    try {
      const { userId } = req;

      const isUser = await UserModel.isUser(userId);

      if (!isUser) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const { eventId } = req.body;

      await EventModel.findByIdAndUpdate(eventId, {
        $push: { joinedUsers: userId },
      });

      res.status(OK).json({ message: "Event Joined" });
    } catch (error) {
      errorHandler(res, error, "Error Joining Event");
    }
  },
  getEventStatistics: async (req, res) => {
    try {
      const { userId } = req;

      const allEvents = await EventModel.find();

      const isAdmin = await UserModel.isAdmin(userId);

      let eventsCreated;

      if (!isAdmin) {
        eventsCreated = allEvents.filter((item) => {
          return item.userId.toString() === userId;
        });

        const eventsJoined = allEvents.filter((item) => {
          const { joinedUsers } = item;
          return joinedUsers.includes(userId);
        });
        return res.status(OK).json({
          message: "Stats Returned",
          stats: { eventsCreated: eventsCreated.length, eventsJoined: eventsJoined.length },
        });
      }

      eventsCreated = allEvents.map((item) => {
        return item;
      });

      res.status(OK).json({
        message: "Stats Returned",
        stats: { eventsCreated: eventsCreated.length },
      });
    } catch (error) {
      errorHandler(res, error, "Error Joining Event");
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { userId } = req;
      const isAdmin = await UserModel.isAdmin(userId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const { eventId } = req.body;

      await EventModel.deleteOne({ _id: eventId });

      res.status(OK).json({ message: "Event Deleted" });
    } catch (error) {
      errorHandler(res, error, "Error Deleting Event");
    }
  },

  changeEventStatus: async (req, res) => {
    try {
      const { userId } = req;
      const { eventId, status } = req.body;

      const isAdmin = await UserModel.isAdmin(userId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      await EventModel.findByIdAndUpdate(eventId, {
        status,
      });

      res.status(OK).json({ message: "Event Status Changed" });
    } catch (error) {
      errorHandler(res, error, "Error Changing Event Status");
    }
  },
};
