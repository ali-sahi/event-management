import { Button, Divider, FormControl, Grid2, Paper, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { CheckAxiosError } from "../utils/checkAxiosError";
import API from "../config/apiClient";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";
import { eventValidationSchema } from "../schemas/eventSchema";
import CustomFieldError from "../components/CustomFieldError";

const initialValues = {
  eventTitle: "",
  eventDetails: "",
  venueAdress: "",
  eventDate: dayjs(),
  eventTime: dayjs().hour(12).minute(0).second(0),
  speakerName: "",
  speakerEmail: "",
  speakerPhone: "",
  speakerDesignation: "",
};

const CreateEvent = () => {
  const { user } = useAuth();
  const submitHandle = async (values) => {
    try {
      const res = await API.post(`/event/create_event/${user._id}`, values);

      toast.success(res.data.message);
    } catch (error) {
      CheckAxiosError(error);
    }
    console.log(values);
  };
  return (
    <Paper sx={{ padding: "50px" }}>
      <Stack spacing={2}>
        <Typography variant="h5">Event Information</Typography>
        <Divider />
      </Stack>
      <Formik initialValues={initialValues} onSubmit={submitHandle} validationSchema={eventValidationSchema}>
        {({ setFieldValue, values }) => (
          <Form>
            <Grid2 container>
              <Grid2
                size={6}
                sx={{ borderRight: "1px solid", borderColor: "divider", marginTop: "30px", padding: "20px" }}
              >
                <Stack spacing={3}>
                  <Field name="eventTitle" as={TextField} type="text" label="Event Title" fullWidth />
                  <CustomFieldError name={"eventTitle"} />
                  <Field
                    name="eventDetails"
                    as={TextField}
                    type="text"
                    label="Event Details"
                    multiline
                    rows={3}
                    fullWidth
                  />
                  <CustomFieldError name={"eventDetails"} />
                  <Field name="venueAdress" as={TextField} type="text" label="Venue/Adress" fullWidth />
                  <CustomFieldError name={"venueAdress"} />
                  <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                      <FormControl fullWidth variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Event Date"
                            format="DD/MM/YYYY"
                            name="eventDate"
                            value={values.eventDate}
                            onChange={(newValue) => {
                              setFieldValue("eventDate", newValue);
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                      <CustomFieldError name={"eventDate"} />
                    </Grid2>
                    <Grid2 size={6}>
                      <FormControl fullWidth variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Event Time"
                            name="eventTime"
                            value={values.eventTime}
                            onChange={(newValue) => setFieldValue("eventTime", newValue)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                      <CustomFieldError name={"eventTime"} />
                    </Grid2>
                  </Grid2>
                </Stack>
              </Grid2>

              {/* ==================================== */}

              <Grid2 size={6} sx={{ marginTop: "30px", padding: "20px" }}>
                <Stack spacing={3}>
                  <Field name="speakerName" as={TextField} type="text" label="Speaker Name" fullWidth />
                  <CustomFieldError name={"speakerName"} />
                  <Field name="speakerEmail" as={TextField} type="email" label="Speaker Email" fullWidth />
                  <CustomFieldError name={"speakerEmail"} />
                  <Field name="speakerPhone" as={TextField} type="text" label="Speaker Phone" fullWidth />
                  <CustomFieldError name={"speakerPhone"} />
                  <Field name="speakerDesignation" as={TextField} type="text" label="Speaker Designation" fullWidth />
                  <CustomFieldError name={"speakerDesignation"} />
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>

                  {/* ======================================== */}
                </Stack>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CreateEvent;
