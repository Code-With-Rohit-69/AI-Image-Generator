import React from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useApp } from "./context/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
  const { showLogin, userLoading, setShowLogin, user } = useApp();

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-white-50">
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/result"
          element={
            // userLoading ? (
            //   <div className="text-center mt-10">Checking auth...</div>
            // ) : user ? (
            //   <Result />
            // ) : (
            //   setShowLogin(true)
            // )
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy"
          element={
            <ProtectedRoute>
              <BuyCredit />
            </ProtectedRoute>
          }
        />

        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
