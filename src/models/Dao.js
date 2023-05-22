import mongoose from 'mongoose';
// import config from "../config/config.js";
import dotenvConfig from '../config/dotenv.config.js';

import User from './User.js';
import Post from './Post.js';

export default class Dao {
    constructor() {
        mongoose.set("strictQuery", false);
        this.connection = mongoose.connect(dotenvConfig.mongo.MONGO_URL)

        const userSchema = mongoose.Schema(User.schema)
        const postSchema = mongoose.Schema(Post.schema)

        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            [Post.model]: mongoose.model(Post.model, postSchema),
        }
    }

    getAll = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].find(params).lean();
    }

    findOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe')
        return this.models[entity].findOne(params).lean();
    }

    save = (document, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].create(document);
    }

    editOne = (params, entity, document) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findOneAndUpdate(params, document, {
            new: true
        });
    }

    deleteOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].deleteOne(params);
    }
}