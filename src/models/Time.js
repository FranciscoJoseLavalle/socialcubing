import { Schema } from "mongoose";

export default class Time {
    static get model() {
        return 'Times';
    }
    static get schema() {
        return {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            time: String,
            cathegory: String
        }
    }
}