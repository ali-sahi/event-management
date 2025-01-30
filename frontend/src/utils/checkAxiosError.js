import toast from "react-hot-toast";

export const CheckAxiosError = (error, customMsg = "") => {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
    console.log(error);
  } else {
    toast.error(customMsg);
    console.log(error);
  }
};
