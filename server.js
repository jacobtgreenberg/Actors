//DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const db = mongoose.connection;
const session = require('express-session')

//PORT
const PORT = process.env.PORT || 3000;

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/actors'


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on('open' , ()=>{})

//MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('dotenv').config()
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

//MODELS
const seed = require('./models/seed.js')
const Actor = require('./models/actormodel.js')

//CONTROLLERS
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)
const actorsController = require('./controllers/actors_controller.js')
app.use('/actors', actorsController)

//HOME
app.get('/' , (req, res) => {
    res.redirect('/actors')
})

app.listen(PORT)

