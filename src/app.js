import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from "mongoose";
import dotenvConfig from "./config/dotenv.config.js";
import userService from "./database/User.js";

const connection = mongoose.connect(dotenvConfig.mongo.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('timer', {
        title: "Inicio"
    })
})
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Iniciar sesión'
    });
});
app.post('/login', async (req, res) => {
});
app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registrarse'
    });
});
app.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    let newUser = {
        email,
        name,
        password,
        times: [],
        friends: []
    }

    let response;

    let exists = await userService.find({ email: newUser.email })
    if (exists.length === 0) {
        response = { error: "Logged succesfully" };
        await userService.create(newUser)
    } else {
        response = { error: "user already exists" };
    }

    res.send(response);
});