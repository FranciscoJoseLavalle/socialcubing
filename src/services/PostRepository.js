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
    getAllPopulate = async (params) => {
        let result = await this.getAll(params).populate(['author', 'comments'])
        return result
    }
    getCommentsPopulate = async (params) => {
        let result = await this.getAll(params).populate('author')
        return result
    }
}