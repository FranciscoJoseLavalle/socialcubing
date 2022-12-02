import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from "mongoose";
import dotenvConfig from "./config/dotenv.config.js";
import userService from "./database/User.js";

const connection = mongoose.connect("mongodb+srv://fran:cubetimer123@cubetimer.hgqcuxl.mongodb.net/?retryWrites=true&w=majority");

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
    const { email, password } = req.body;

    let user = await userService.findOne({ email: email });

    let response;

    if (user && user.password === password) {
        response = { status: true, userId: user._id, userName: user.name };
    } else {
        response = { status: false };
    }
    res.send(response);
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

    let exists = await userService.findOne({ email: newUser.email })
    if (!exists) {
        let user = await userService.create(newUser)
        response = { status: true, userId: user._id, userName: user.name };
    } else {
        response = { message: false };
    }

    res.send(response);
});

app.get('/explorar', async (req, res) => {
    res.render('explorar');
});
app.get('/explorar/getUsers', async (req, res) => {
    let users = await userService.find({});

    res.send(users);
});
app.put('/explorar/getUsers', async (req, res) => {
    const { userId, userAdded } = req.body;
    let users = await userService.find({});

    res.send(users);
});