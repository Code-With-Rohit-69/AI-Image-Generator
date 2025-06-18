import User from "../models/User.model.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const userId = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not available" });
    }

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt not available" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();

    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data).toString("base64");

    const resultImage = `data:image/png;base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Image Generated",
        creditBalance: user.creditBalance - 1,
        resultImage
      });
  } catch (error) {
    console.log(`Error in generateImage controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};
