import toast from "react-hot-toast";

export const CheckAxiosError = (error, customMsg = "") => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.message &&
    error.response.data?.message !== "Token expired decode"
  ) {
    toast.error(customMsg || error.response.data.message);
    console.log(error);
  } else {
    console.log(error);
  }
};
