const { z } = require("zod");

module.exports.eventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  eventDetails: z.string().min(1, "Event details are required"),
  venueAdress: z.string().min(1, "Venue address is required"),
  eventDate: z.date().min(new Date(0), "Event date is required"),
  eventTime: z.date().min(new Date(0), "Event time is required"),
  speakerName: z.string().min(1, "Speaker name is required"),
  speakerEmail: z.string().email("Please provide a valid email").min(1, "Speaker email is required"),
  speakerPhone: z.string().min(11, "Speaker phone number is required"),
  speakerDesignation: z.string().min(1, "Speaker designation is required"),
});
