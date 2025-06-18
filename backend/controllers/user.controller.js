import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: "7d",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(`Error in Register controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: "7d",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", token });
  } catch (error) {
    console.log(`Error in Login controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        expiresIn: "7d",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(`Error in Logout controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ successs: false, message: "User not available" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ successs: false, message: "User not available" });
    }

    return res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(`Error in userCredits controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    if (!email || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not available" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password length must be greater or equal to 8",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is not correct",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password Updated successfully.", user });
  } catch (error) {
    console.log(`Error in resetPassword controller ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export { register, login, logout, getUser, userCredits, resetPassword };
