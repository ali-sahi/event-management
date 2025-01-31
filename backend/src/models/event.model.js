const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    eventTitle: {
      type: String,
      required: true,
    },
    eventDetails: {
      type: String,
      required: true,
    },
    venueAdress: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    speakerName: {
      type: String,
      required: true,
    },
    speakerEmail: {
      type: String,
      required: true,
    },
    speakerPhone: {
      type: String,
      required: true,
    },
    speakerDesignation: {
      type: String,
      required: true,
    },
    joinedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
