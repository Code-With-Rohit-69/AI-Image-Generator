import { Router } from "express";
import {
  login,
  logout,
  register,
  getUser,
  userCredits,
  resetPassword,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authentication.js";
const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(authUser, logout);
userRouter.route("/getUser").get(authUser, getUser);
userRouter.route("/credits").get(authUser, userCredits);
userRouter.route("/forget-password").post(resetPassword);

export default userRouter;
