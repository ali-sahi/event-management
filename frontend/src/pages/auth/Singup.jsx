import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { Link, useNavigate } from "react-router";
import WelcomeHeading from "../../components/WelcomeHeading";
import CustomFieldError from "../../components/CustomFieldError";
import { CheckAxiosError } from "../../utils/checkAxiosError";
import { useAuth } from "../../providers/AuthProvider";
import { signupSchema } from "../../schemas/authSchema";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await registerUser(values);
      navigate("/");
    } catch (error) {
      CheckAxiosError(error);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ padding: "50px" }}>
        <WelcomeHeading />

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="email" as={TextField} type="email" label="Email" fullWidth />
                <CustomFieldError name={"email"} />
                <Field name="password" as={TextField} type="password" label="Password" fullWidth />
                <CustomFieldError name={"password"} />
                <Field name="confirmPassword" as={TextField} type="password" label="Confirm Password" fullWidth />
                <CustomFieldError name={"confirmPassword"} />

                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                    Sign in
                  </Link>
                </Typography>

                <Button type="submit" disabled={isSubmitting} variant="contained">
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Signup;
