import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useApp } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin, handleLogin, handleRegister, setShowForgetPassword } =
    useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (state === "Login") {
      await handleLogin(email, password);
    } else {
      await handleRegister(name, email, password);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        className="relative bg-white p-10 rounded-xl text-slate-500"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state != "Login" && (
          <div className="border px-3 py-1.5 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} className="" width={30} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="border px-3 py-3 flex items-center gap-4 rounded-full mt-5">
          <img src={assets.email_icon} className="" width={15} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            className="outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="border px-3 py-3 flex items-center gap-4 rounded-full mt-5">
          <img src={assets.lock_icon} className="" width={15} alt="" />
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            className="outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span onClick={handleShowPassword} className="cursor-pointer">
            {showPassword ? "Show" : "Hide"}
          </span>
        </div>

        {state === "Login" && (
          <p
            className="text-sm text-blue-600 my-4 cursor-pointer"
            onClick={() => {
              setShowLogin(false);
              setShowForgetPassword(true);
              navigate("/forget-password");
            }}
          >
            Forget Password?
          </p>
        )}

        <button className={`bg-blue-500 w-full text-white py-2 rounded-full cursor-pointer hover:bg-blue-400 duration-150 ${state === "Sign Up" && "mt-5"}`}>
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              {" "}
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              {" "}
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </form>
    </div>
  );
};

export default Login;
