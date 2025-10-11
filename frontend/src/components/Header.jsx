import React from "react";
import { delay, motion } from "framer-motion";

import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

import "../styles/animation.css";
import { useApp } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, setShowLogin } = useApp();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center pt-10 relative"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute left-[10%] top-[20%] lg:block sm:hidden handAnimation">
        <span className="text-[10vw]">👋</span>
      </div>
      <div className="flex gap-2 bg-white text-gray-600 text-[.6rem] px-7 py-1 border border-gray-300 rounded-full">
        <span>Best text to image generator</span>
        <img src={assets.star_icon} alt="" />
      </div>
      <motion.div
        className="mt-2 pt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p className="text-[2.7rem] text-center font-medium leading-12">
          Turn text to <br />{" "}
          <span
            className="text-[#007aff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
          >
            image
          </span>
          , in seconds.
        </motion.p>
        <motion.p
          className="text-gray-700 text-[.7rem] w-full sm:w-[22rem] text-center my-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Unleash your creativity with AI. Turn your imagination into visual art
          in seconds – just type, and watch the magic happen.
        </motion.p>
        <motion.button
          className="bg-gray-800 cursor-pointer hover:scale-105 duration-100 text-white flex items-center text-xs px-4 py-2 rounded-full gap-2 mx-auto"
          onClick={onClickHandler}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
        >
          Generate Images
          <img src={assets.star_group} alt="" className="w-5 block" />
        </motion.button>
      </motion.div>
      <div className="flex items-center gap-3 mt-6 flex-col">
        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {Array(6)
            .fill(" ")
            .map((image, index) => (
              <motion.img
                src={
                  index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1
                }
                key={index}
                width={70}
                className="rounded-md"
                whileHover={{ scale: 1.05, duration: 0.1 }}
              />
            ))}
        </motion.div>
        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Generated images from imagify
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Header;
