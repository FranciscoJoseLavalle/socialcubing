import GenericRepository from "./GenericRepository.js";
import User from "../models/User.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao, User.model);
    }

    getUserByEmail = (email) => {
        return this.getBy({ email })
    }
    newPost = async (params, data) => {
        let user = await this.getBy(params)
        user.posts.push(data)
        let result = await this.editOne(params, user);
        return result;
    }
    getAllNotes = async (params) => {
        let test = await this.getBy(params).populate('posts');
        return test;
    }
    getAllFriends = async (params) => {
        try {
            let test = await this.getBy(params).populate('friends');
            return test;
        } catch (error) {
            return error;
        }
    }
}