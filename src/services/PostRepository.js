import GenericRepository from "./GenericRepository.js";
import Post from "../models/Post.js";
import { userService } from "./services.js";

export default class PostRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Post.model);
    }

    saveOne = async (data) => {
        let post = this.save(data);
        return post;
    }
    getAllPopulate = async () => {
        // let posts = await this.getAll();
        // let newArray = []
        // posts.forEach(async (post) => {
        //     let user = await userService.getBy({ _id: post.author })
        //     let result = { ...post, author: user }
        //     newArray.push(result);
        // })
        let result = await this.getAll().populate('author')
        return result
    }
}