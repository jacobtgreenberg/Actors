const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/actors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json())

const seed = require('./models/seed.js')
const Actor = require('./models/actormodel.js')

//ROUTES//

//INDEX//
app.get('/' , (req, res) => {
    Actor.find({}, (err, allActors) => {
        res.render('index.ejs', {
            actors : allActors
        })
    })
})

//SHOW//
app.get('/:id' , (req, res) => {
    Actor.findById(req.params.id ,(err, foundActor) => {
        res.render('show.ejs' , {
            actor : foundActor
        })
    })
})

//NEW//
app.get('/new' , (req, res) => {
    res.render('new.ejs')
})


//SEED//
app.get('/seed', (req, res) => {
    Actor.create(seed, (error, data) => {
        res.redirect('/')
    })
})



app.listen(3000)

