import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CheckAxiosError } from "../utils/checkAxiosError";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router";
import { loginSchema } from "../schemas/authSchema";
import WelcomeHeading from "../components/WelcomeHeading";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    try {
      await login(values);
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

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <Stack spacing={3}>
                <Field
                  name="email"
                  as={TextField}
                  type="email"
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="password"
                  as={TextField}
                  type="password"
                  label="Password"
                  fullWidth
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Don&apos;t have an account?{" "}
                  <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                    Sign up
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

export default Login;
