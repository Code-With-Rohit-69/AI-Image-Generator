import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, setShowLogin, userLoading } = useApp();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !userLoading) {
      setShowLogin(true);
      toast.error("You are not logged in. Login First");
    }
  }, [user, userLoading]);

  if (userLoading) return null;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
