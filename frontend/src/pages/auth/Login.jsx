import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { Link, useNavigate } from "react-router";

import WelcomeHeading from "../../components/WelcomeHeading";
import { CheckAxiosError } from "../../utils/checkAxiosError";
import { useAuth } from "../../providers/AuthProvider";

import { loginSchema } from "../../schemas/authSchema";
import CustomFieldError from "../../components/CustomFieldError";
import { useAxios } from "../../providers/AxiosInterceptorProvider";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setSessionExpired } = useAxios();

  useEffect(() => {
    setSessionExpired(false);
  }, []);

  const handleSubmit = async (values) => {
    try {
      await login(values);
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

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="email" as={TextField} type="email" label="Email" fullWidth />
                <CustomFieldError name={"email"} />
                <Field name="password" as={TextField} type="password" label="Password" fullWidth />
                <CustomFieldError name={"password"} />

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
