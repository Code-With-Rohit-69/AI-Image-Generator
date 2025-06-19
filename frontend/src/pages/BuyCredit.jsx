import React from "react";

import { assets, plans } from "../assets/assets";
import { useApp } from "../context/AppContext";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import API from "../services/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BuyCredit = () => {
  const { user } = useApp();

  const [loading, setLoading] = useState(false);

  const handleBuyCredits = async (credits) => {
    setLoading(true);
    const { data } = await API.post("/payment/create-checkout-session", {
      credits,
    });

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.id });

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 pb-[10rem]">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((data, index) => (
          <div
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{data.id}</p>
            <p className="text-sm">{data.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${data.price} </span>/{" "}
              {data.credits} credits
            </p>
            <button
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer"
              onClick={() => handleBuyCredits(data.credits)}
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
