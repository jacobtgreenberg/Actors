const express = require('express')
const actors = express.Router()
const Actor = require('../models/actormodel.js')

//ROUTES//

//INDEX//
actors.get('/', (req, res) => {
    Actor.find({}, (err, allActors) => {
        res.render('actors/index.ejs', {
            actors : allActors,
            currentUser : req.session.currentUser
        })
    })
})

//NEW//
actors.get('/new', (req, res) => {
    res.render('actors/test.ejs', {
        currentUser : req.session.currentUser
    })
})

//CREATE//
actors.post('/', (req, res) => {
    Actor.create(req.body, (err, newActor) => {
        res.redirect('/')
    })
})

//SEED//
actors.get('/seed', (req, res) => {
    Actor.create(seed, (error, data) => {
        res.redirect('/')
    })
})

//DELETE//
actors.delete('/:id', (req, res) => {
    Actor.findByIdAndDelete(req.params.id, (err, deletedActor) => {
        res.redirect('/')
    })
})

//SHOW//
actors.get('/:id', (req, res) => {
    Actor.findById(req.params.id ,(err, foundActor) => {
        res.render('actors/show.ejs' , {
            actor : foundActor,
            currentUser : req.session.currentUser 
        })
    })
})

//EDIT//
actors.get('/:id/edit', (req, res) => {
    Actor.findById(req.params.id, (err, foundActor) => {
        res.render('actors/test.ejs', {
            actor : foundActor,
            currentUser : req.session.currentUser
        })
    })
})

//UPDATE//
actors.put('/:id', (req, res) => {
    Actor.findByIdAndUpdate(req.params.id, req.body, (err,updatedModel) => {
        res.redirect(`/actors/${req.params.id}`)
    })
})


module.exports = actors