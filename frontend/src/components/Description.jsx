import React from "react";
import { assets } from "../assets/assets";

import "../styles/animation.css";
import { delay, motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      className="my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-2xl font-semibold text-center">Create AI Images</h1>
      <p className="text-center text-gray-600 text-[.7rem]">
        Turn your imagination into visuals
      </p>
      <div className="flex gap-1 justify-center mt-[3rem] px-16">
        <div className="w-[40%] flex items-center justify-center">
          <img
            src={assets.sample_img_1}
            alt=""
            className="w-[70%] rounded-2xl image"
          />
        </div>
        <div className="w-[60%]">
          <h2 className="text-[1.1rem] font-medium text-gray-800 w-2xs mb-[1rem]">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-[.8rem] text-gray-600">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
            <br />
            <br />
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
