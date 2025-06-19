import express from "express";
import Stripe from "stripe";

import dotenv from "dotenv";
import User from "../models/User.model.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const updateCredits = async (req, res) => {
  const { credits } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.creditBalance += credits;
    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error updating credits:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const payment = async (req, res) => {
  const { credits } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${credits} AI Credits`,
            },
            unit_amount: credits * 1000,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?credits=${credits}`,
      cancel_url: "http://localhost:5173/payment=cancel",
    });

    res.status(200).json({
      success: true,
      message: "Purchased Successfully",
      id: session.id,
    });
  } catch (error) {
    console.log(`Error in payment controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};
