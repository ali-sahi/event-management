import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.password === value;
    }),
});
