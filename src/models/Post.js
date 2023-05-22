import { Schema } from "mongoose";

export default class Post {
    static get model() {
        return 'Posts';
    }
    static get schema() {
        return {
            text: String,
            timestamp: Number,
            comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Comments'
            }],
            author: {
                type: Schema.Types.ObjectId,
                ref: "Users"
            },
            interactions: [{
                type: Schema.Types.ObjectId,
                ref: "Users"
            }]
        }
    }
}