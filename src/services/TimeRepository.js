import GenericRepository from "./GenericRepository.js";
import Time from "../models/Time.js";

export default class TimeRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Time.model);
    }

    getAll = async (params, data) => {
        let user = await this.getBy(params)
        user.posts.push(data)
        let result = await this.editOne(params, user);
        return result;
    }
}