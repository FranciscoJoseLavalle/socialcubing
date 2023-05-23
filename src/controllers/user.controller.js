import { userService, postService } from "../services/services.js";

const getUser = async (req, res) => {
    try {
        let uid = req.params.uid;
        let user = await userService.getAllNotes({ _id: uid })
        res.send({ status: "success", message: "User found", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}
const editPhoto = async (req, res) => {
    try {
        let { uid, url } = req.body;
        let user = await userService.getBy({ _id: uid });
        user.thumbnail = url;
        await userService.editOne({ _id: uid }, user)
        res.send({ status: "success", message: "Photo changed", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await userService.getAll();
        res.send({ status: "success", message: "All users", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const newPost = async (req, res) => {
    try {
        const { uid, post } = req.body;
        let user = await userService.getBy({ _id: uid });
        console.log(post);
        console.log(user);
        let postCreated = await postService.saveOne(post, { uid: user._id })
        console.log(postCreated);
        user.posts = user.posts.concat(postCreated._id);
        await userService.editOne({ _id: uid }, user)
        await userService.getAllNotes({ _id: uid })
        res.send({ status: "success", message: "Post uploaded", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const addFriend = async (req, res) => {
    try {
        const { uid, fid } = req.body;
        let user = await userService.getBy({ _id: uid });
        user.friends = user.friends.concat(fid);
        await userService.editOne({ _id: uid }, user)
        res.send({ status: "success", message: "Friend added", payload: user.friends });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getFriends = async (req, res) => {
    try {
        const { uid } = req.params;
        let user = await userService.getAllFriends({ _id: uid });
        res.send({ status: "success", message: "All friends", payload: user.friends });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const { uid } = req.body;
        let userPosts = await userService.getAllNotes({ _id: uid })
        res.send({ status: "success", message: "All posts", payload: userPosts.posts });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    getUser,
    getAllUsers,
    getAllPosts,
    newPost,
    addFriend,
    getFriends,
    editPhoto
}