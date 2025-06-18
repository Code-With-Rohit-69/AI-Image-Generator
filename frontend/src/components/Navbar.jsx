import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setShowLogin, handleLogout, fetchUser } = useApp();

  const [isSticky, setIsSticky] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      const timeout = setTimeout(() => {
        if (window.scrollY > 50) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }, 200);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  return (
    <>
      <nav
        className={`w-full z-50 transition-all duration-700 ${
          isSticky
            ? "fixed top-0 right-0 left-0 bg-white/10 backdrop-blur-md"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <Link to="/">
              <img
                src={assets.logo}
                alt="logo"
                className="cursor-pointer w-28 sm:w-32 lg:w-40"
              />
            </Link>

            <div>
              {user ? (
                <div className="flex items-center gap-4 sm:gap-3">
                  <button
                    onClick={() => navigate("/buy")}
                    className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-400"
                  >
                    <img src={assets.credit_star} className="w-5" alt="" />
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Credits left: {user.creditBalance}
                    </p>
                  </button>
                  <p className="text-gray-600 max-sm:hidden pl-4">
                    Hi, {user.name}
                  </p>
                  <div className="relative group pl-2">
                    <img
                      src={assets.profile_icon}
                      className="w-10 drop-shadow cursor-pointer"
                      alt=""
                    />
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 cursor-pointer">
                      <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                        <li className="py-1 px-2 pr-10 " onClick={handleLogout}>
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-40 sm:gap-5">
                  <p
                    onClick={() => navigate("/buy")}
                    className="cursor-pointer"
                  >
                    Pricing
                  </p>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isSticky && <div className="h-[72px]"></div>}{" "}
    </>
  );
};

export default Navbar;
