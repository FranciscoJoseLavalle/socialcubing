import mongoose from "mongoose";

const collection = "User";

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    times: Array,
    friends: Array,
})

const userService = mongoose.model(collection,userSchema);

export default userService;