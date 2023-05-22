import { userService } from "../services/services.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from 'jsonwebtoken';
import dotenvConfig from "../config/dotenv.config.js";

const getAllTimes = async (req, res) => {
    try {
        res.send({ status: "success", message: "User registered" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
}