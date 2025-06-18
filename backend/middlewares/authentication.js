import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Authenciation required" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decode.id;

    next();
  } catch (error) {
    console.log(`Error in authUser middleware ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
