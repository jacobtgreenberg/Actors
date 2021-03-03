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

//ROUTES//

//INDEX//
app.get('/', (req, res) => {
    Actor.find({}, (err, allActors) => {
        res.render('actors/index.ejs', {
            actors : allActors,
            currentUser : req.session.currentUser
        })
    })
})

//NEW//
app.get('/new', (req, res) => {
    res.render('actors/test.ejs', {
        currentUser : req.session.currentUser
    })
})

//CREATE//
app.post('/', (req, res) => {
    console.log(req.body)
    Actor.create(req.body, (err, newActor) => {
        res.redirect('/')
    })
})

//SEED//
app.get('/seed', (req, res) => {
    Actor.create(seed, (error, data) => {
        res.redirect('/')
    })
})

//DELETE//
app.delete('/:id', (req, res) => {
    Actor.findByIdAndDelete(req.params.id, (err, deletedActor) => {
        res.redirect('/')
    })
})

//SHOW//
app.get('/:id', (req, res) => {
    Actor.findById(req.params.id ,(err, foundActor) => {
        res.render('actors/show.ejs' , {
            actor : foundActor,
            currentUser : req.session.currentUser 
        })
    })
})

//EDIT//
app.get('/:id/edit', (req, res) => {
    Actor.findById(req.params.id, (err, foundActor) => {
        res.render('actors/test.ejs', {
            actor : foundActor,
            currentUser : req.session.currentUser
        })
    })
})

//UPDATE//
app.put('/:id', (req, res) => {
    Actor.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel) => {
        res.redirect(`/${req.params.id}`)
    })
})

app.listen(PORT)

