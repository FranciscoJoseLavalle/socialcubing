import GenericRepository from "./GenericRepository.js";
import Comment from "../models/Comment.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Comment.model);
    }

    getUserByEmail = (email) => {
        return this.getBy({ email })
    }
}