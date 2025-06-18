import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, setShowLogin } = useApp();
  const hasShownToast = useRef(false); 

  useEffect(() => {
    if (!user) {
      setShowLogin(true);

      if (!hasShownToast.current) {
        toast.error("You are not logged in. Login First");
        hasShownToast.current = true;
      }
    }
  }, [user, setShowLogin]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
