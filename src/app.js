import express from "express";
import session from "express-session";
import cors from 'cors';
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js'
import userRouter from './routes/user.router.js'
import postsRouter from './routes/posts.router.js'
import dotenvConfig from "./config/dotenv.config.js";
import MongoStore from "connect-mongo";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        jwt.verify(token, dotenvConfig.app.TOKEN, (err, user) => {
            if (err) {
                res.send({ status: "error", message: "Necesitas estar logueado" })
            } else {
                req.session.user = user;
                next()
            }
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: "ASDASD",
    store: MongoStore.create({
        mongoUrl: dotenvConfig.mongo.MONGO_URL,
        ttl: 3600
    }),
    resave: false,
    saveUninitialized: false
}))
app.post('/auth', authMiddleware, (req, res) => {
    res.send({ status: "success", payload: req.session.user });
})
app.use('/api/sessions', sessionsRouter);
app.use('/api/user', userRouter);
app.use('/api/posts', postsRouter);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));