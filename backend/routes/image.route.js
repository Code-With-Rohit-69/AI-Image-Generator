import { Router } from "express";
import { authUser } from "../middlewares/authentication.js";
import { generateImage } from "../controllers/image.controller.js";

const imageRouter = Router();

imageRouter.route("/generate-image").post(authUser, generateImage);

export default imageRouter;
