import { Schema } from "mongoose";

export default class User {
    static get model() {
        return 'Users';
    }
    static get schema() {
        return {
            first_name: String,
            last_name: String,
            password: String,
            email: String,
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user',
            },
            times: [{
                type: Schema.Types.ObjectId,
                ref: 'Times'
            }],
            friends: [{
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }],
            posts: [{
                type: Schema.Types.ObjectId,
                ref: 'Posts'
            }],
        }
    }
}