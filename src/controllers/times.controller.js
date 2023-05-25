import { timeService, userService } from "../services/services.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from 'jsonwebtoken';
import dotenvConfig from "../config/dotenv.config.js";

const getUserTimes = async (req, res) => {
    try {
        const { uid } = req.params;
        let user = await userService.getPopulate({ _id: uid }, "times");
        res.send({ status: "success", message: "All times", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}
const saveTime = async (req, res) => {
    try {
        console.log('hola?');
        const { timeGetted, uid } = req.body;
        console.log(uid);
        console.log(timeGetted);
        let result = await timeService.save(timeGetted);
        let user = await userService.getBy({ _id: uid })
        console.log(result);
        user.times = user.times.concat(result._id);
        await userService.editOne({ _id: uid }, user)
        console.log(result);
        res.send({ status: "success", message: "Last time", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    getUserTimes,
    saveTime
}