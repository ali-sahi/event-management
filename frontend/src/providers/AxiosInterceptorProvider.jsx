import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import API from "../config/apiClient";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const AxiosContext = createContext(null);

const AxiosInterceptorProvider = ({ children }) => {
  const { setUser } = useAuth();
  const [sessionExpired, setSessionExpired] = useState();

  useEffect(() => {
    let timeoutId;
    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401 && error.response.data.message === "Token expired decode") {
          console.log("uinauthorized redirect to login.");

          setSessionExpired(true);

          timeoutId = setTimeout(() => {
            removeUserFromLocalStorage();
            setUser(null);
          }, 5000);
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, [setUser]);

  return <AxiosContext.Provider value={{ sessionExpired, setSessionExpired }}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  return useContext(AxiosContext);
};

export default AxiosInterceptorProvider;
