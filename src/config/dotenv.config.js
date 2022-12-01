import dotenv from 'dotenv';

dotenv.config({})

export default {
    mongo: {
        MONGO_URL: process.env.MONGO_URL
    }
}