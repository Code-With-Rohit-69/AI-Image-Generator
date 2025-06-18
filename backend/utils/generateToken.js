import jwt from "jsonwebtoken";

export const generateToken = async (id) => {
    try {
        const token = await jwt.sign({id}, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.log(`Error in generating token: ${error.message}`);
        return res.status(400).json({success: false, message: "Failed!"});
    }
}
