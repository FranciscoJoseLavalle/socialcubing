import { commentService, postService } from "../services/services.js"

const getAll = async (req, res) => {
    try {
        const { pid } = req.params
        let post = await postService.getCommentsPopulate({ _id: pid })
        res.send({ status: "success", message: "All comments", payload: post });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}
const addComment = async (req, res) => {
    try {
        const { pid, comment } = req.body;
        let newComment = await commentService.save(comment);
        let post = await postService.getBy({ _id: pid })
        post.comments = post.comments.concat(newComment._id)
        await postService.editOne({ _id: pid }, post)

        res.send({ status: "success", message: "New comment", payload: newComment });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}


export default {
    getAll,
    addComment
}