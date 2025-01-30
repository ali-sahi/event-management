import * as Yup from "yup";

export const eventValidationSchema = Yup.object().shape({
  eventTitle: Yup.string().required("Event title is required"),
  eventDetails: Yup.string().required("Event details are required"),
  venueAdress: Yup.string().required("Venue/Address is required"),
  eventDate: Yup.date().required("Event date is required").typeError("Invalid date"),
  eventTime: Yup.date().required("Event time is required").typeError("Invalid time"),
  speakerName: Yup.string().required("Speaker name is required"),
  speakerEmail: Yup.string().email("Invalid email format").required("Speaker email is required"),
  speakerPhone: Yup.string().min(10, "Phone number must be at least 11 digits").required("Speaker phone is required"),
  speakerDesignation: Yup.string().required("Speaker designation is required"),
});
