import { ErrorMessage } from "formik";
import React from "react";

const CustomFieldError = ({ name }) => {
  return <ErrorMessage name={name} component="div" style={{ color: "red", fontSize: "12px", marginTop: "10px" }} />;
};

export default CustomFieldError;
