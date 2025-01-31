/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import API from "../config/apiClient";
import toast from "react-hot-toast";
import { getUserFromLocalStorage, removeUserFromLocalStorage, setUserToLocalStorage } from "../utils/localStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const userFromStorage = getUserFromLocalStorage();
  const userValue = userFromStorage ? userFromStorage : null;

  const [user, setUser] = useState(userValue);

  const registerUser = async (values) => {
    const res = await API.post("/auth/register", values);
    setUser(res.data.user);
    setUserToLocalStorage(res.data.user);
    toast.success(res.data.message);
  };

  const login = async (values) => {
    const res = await API.post("/auth/login", values);
    setUser(res.data.user);
    setUserToLocalStorage(res.data.user);
    toast.success(res.data.message);
  };

  const logout = async () => {
    await API.get("/auth/logout");
    removeUserFromLocalStorage();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, login, logout, registerUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
