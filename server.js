const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/actors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()


app.use(express.static('public'))
app.use(express.json())

const seed = require('./models/seed.js')
const Actor = require('./models/actormodel.js')




//ROUTES//
app.get('/' , (req, res) => {
    Actor.find({}, (err, allActors) => {
        res.render('index.ejs', {
            actors : allActors
        })
    })
})

app.get('/seed', (req, res) => {
    Actor.create(seed, (error, data) => {
        res.redirect('/')
    })
})


app.listen(3000)

