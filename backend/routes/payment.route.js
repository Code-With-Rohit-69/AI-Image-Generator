import express from "express";
import { authUser } from "../middlewares/authentication.js";
import { payment, updateCredits } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.route("/create-checkout-session").post(authUser, payment);
paymentRouter.route("/update-credits").post(authUser, updateCredits);

export default paymentRouter;
