import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <div className="my-[4rem]">
        <h3 className="text-center mb-5 text-2xl font-semibold">See the magic. Try now</h3>
        <button className="bg-gray-800 cursor-pointer hover:scale-105 duration-500 text-white flex items-center text-xs px-4 py-2 rounded-full gap-2 mx-auto">
          Generate Images
          <img src={assets.star_group} alt="" className="w-5 block" />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
