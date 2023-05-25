import GenericRepository from "./GenericRepository.js";
import Time from "../models/Time.js";

export default class TimeRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Time.model);
    }

}