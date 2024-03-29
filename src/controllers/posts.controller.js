import { postService, userService } from "../services/services.js";

const getAll = async (req, res) => {
    try {
        let posts = await postService.getAllPopulate();
        res.send({ status: "success", message: "All posts", payload: posts });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}
const getAllFiltered = async (req, res) => {
    try {
        const { uid } = req.params
        // let posts = await postService.getAllPopulate({ author: uid });
        let posts = await postService.getAllPopulate({ author: uid }, 'interactions');
        res.send({ status: "success", message: "All user posts", payload: posts });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}
const save = async (req, res) => {
    try {
        let post = await postService.saveOne({ text: "Hola", timestamp: Date.now() });
        res.send({ status: "success", message: "User registered", paylaod: post });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const likePost = async (req, res) => {
    try {
        const { uid, pid } = req.body;
        let post = await postService.getBy({ _id: pid });
        let postFiltered = post.interactions.find(el => el == uid)
        if (!postFiltered) {
            post.interactions = post.interactions.concat(uid);
            await postService.editOne({ _id: pid }, post)
        }
        res.send({ status: "success", message: "Post liked", paylaod: post });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    getAll,
    save,
    likePost,
    getAllFiltered
}