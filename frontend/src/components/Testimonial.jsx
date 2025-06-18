import React from "react";
import { assets, testimonialsData } from "../assets/assets";

import { delay, motion } from "framer-motion";

const Testimonial = () => {
  return (
    <motion.div
      className="my-20 mt-[10rem]"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-2xl font-semibold text-center">
        Customer testimonials
      </h1>
      <p className="text-bold-600 text-[.8rem] text-center pt-[.5rem]">
        What Our Users Are Saying
      </p>
      <div className="cards flex flex-wrap items-center justify-center mt-[4rem] gap-12">
        {testimonialsData.map((data, index) => (
          <div
            className="w-[18rem] card flex flex-col items-center justify-center gap-2 shadow-md px-6 bg-sky-50 rounded-2xl py-7"
            key={index}
          >
            <img src={data.image} alt="" />
            <div>
              <h3>{data.name}</h3>
              <p className="text-[.8rem] text-center text-gray-600">
                {data.role}
              </p>
            </div>
            <div className="flex mb-2">
              {Array(data.stars)
                .fill()
                .map((item, index) => (
                  <img src={assets.rating_star} key={index} />
                ))}
            </div>
            <p className="text-center text-gray-600 text-[.8rem]">
              {data.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonial;
