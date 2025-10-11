import React from "react";
import { assets, stepsData } from "../assets/assets";

import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      className="my-28 flex flex-col items-center justify-center pt-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold">How it works</h1>
        <p className="text-gray-700 text-[.6rem] pt-2">
          Transform Words Into Stunning Images
        </p>
      </div>
      <div className=" w-full">
        {stepsData.map((data, index) => (
          <div
            className="shadow-md bg-white/20 px-7 py-4 flex my-4 w-full gap-3 duration-300"
            key={index}
          >
            <img src={data.icon} alt="" width={30} />
            <div className="flex flex-col">
              <h2 className="text-[.9rem] font-semibold">{data.title}</h2>
              <p className="text-[.6rem] text-gray-600">"{data.description}"</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
