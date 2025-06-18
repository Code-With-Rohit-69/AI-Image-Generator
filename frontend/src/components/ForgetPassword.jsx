import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { setShowForgetPassword, handleResetPassword, setShowLogin } = useApp();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const success = await handleResetPassword(
      email,
      newPassword,
      confirmPassword
    );

    if (success) {
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
      setShowLogin(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        className="relative bg-white p-10 rounded-xl text-slate-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-semibold mb-2">
          Forget Password
        </h1>
        <p className="text-sm">
          Welcome back! From here you can reset your password
        </p>

        {/* Email Field */}
        <div className="border px-3 py-3 flex items-center gap-4 rounded-full mt-5">
          <img src={assets.email_icon} width={15} alt="email" />
          <input
            type="email"
            placeholder="Email Id"
            className="outline-none text-sm flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* New Password Field */}
        <div className="border px-3 py-3 flex items-center gap-4 rounded-full mt-5 relative">
          <img src={assets.lock_icon} width={15} alt="lock" />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="outline-none text-sm flex-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="cursor-pointer absolute right-5 text-sm text-blue-500"
          >
            {showNewPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="border px-3 py-3 flex items-center gap-4 rounded-full mt-5 relative">
          <img src={assets.lock_icon} width={15} alt="lock" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="outline-none text-sm flex-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="cursor-pointer absolute right-5 text-sm text-blue-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 w-full text-white py-2 rounded-full cursor-pointer hover:bg-blue-400 duration-150 mt-9 disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        <img
          onClick={() => {
            setShowForgetPassword(false), navigate("/");
          }}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt="close"
        />
      </form>
    </div>
  );
};

export default ForgetPassword;
