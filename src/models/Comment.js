import { Schema } from "mongoose";

export default class Comment {
    static get model() {
        return 'Comments';
    }
    static get schema() {
        return {
            text: String,
            timestamp: Number,
            author: {
                type: Schema.Types.ObjectId,
                ref: "Users"
            },
            comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Comments'
            }],
            interactions: [{
                type: Schema.Types.ObjectId,
                ref: "Users"
            }]
        }
    }
}