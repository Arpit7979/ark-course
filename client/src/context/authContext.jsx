import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getAuthState = async () => {
      try {
        const { data } = await API.get("/api/auth/get-auth");
        if (data.success) {
          setUser(data?.user);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getAuthState();
  }, []);

  const logoutUser = async () => {
    try {
      const { data } = await API.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = { user, logoutUser, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
