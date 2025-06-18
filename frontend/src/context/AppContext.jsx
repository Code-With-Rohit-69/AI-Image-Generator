import { useState, createContext, useContext, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [credit, setCredit] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (email, password) => {
    try {
      const { data } = await API.post("/user/login", { email, password });

      if (data.success) {
        toast.success(data.message);
        await fetchUser();
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong during login.";
      toast.error(errMsg);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await API.post("/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchUser();
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong during signup.";
      toast.error(errMsg);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await API.get("/user/logout");

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(`Error occurred in logout ${error.message}`);
    } finally {
      setUser(null);
    }
  };

  const handleResetPassword = async (email, newPassword, confirmPassword) => {
    try {
      const { data } = await API.post("/user/forget-password", {
        email,
        newPassword,
        confirmPassword,
      });

      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
      return false;
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await API.post("/image/generate-image", { prompt });

      if (data.success) {
        toast.success(data.message);
        return data.resultImage;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error in generating Image : ${error.message}`);
      toast.error("Something went wrong");
    }
  };

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const { data } = await API.get("/user/getUser");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      console.log("User not authenticated");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [showLogin]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    credit,
    setCredit,
    handleLogout,
    handleLogin,
    handleRegister,
    fetchUser,
    generateImage,
    userLoading,
    setShowForgetPassword,
    showForgetPassword,
    handleResetPassword,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  return useContext(AppContext);
};
