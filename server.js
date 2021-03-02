//DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const db = mongoose.connection;

//PORT
const PORT = process.env.PORT || 3000;

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/actors'


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on('open' , ()=>{})

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const seed = require('./models/seed.js')
const Actor = require('./models/actormodel.js')

//ROUTES//

//INDEX//
app.get('/', (req, res) => {
    Actor.find({}, (err, allActors) => {
        res.render('index.ejs', {
            actors : allActors
        })
    })
})

//NEW//
app.get('/new', (req, res) => {
    res.render('test.ejs')
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
        res.render('show.ejs' , {
            actor : foundActor, 
        })
    })
})

//EDIT//
app.get('/:id/edit', (req, res) => {
    Actor.findById(req.params.id, (err, foundActor) => {
        res.render('test.ejs', {
            actor : foundActor
        })
    })
})

//UPDATE//
app.put('/:id', (req, res) => {
    Actor.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel) => {
        res.redirect(`/${req.params.id}`)
    })
})









app.listen(3000)

