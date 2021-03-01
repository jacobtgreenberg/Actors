const express = require('express')
const app = express()


app.use(express.static('public'))
app.use(express.json())

const seed = require('./models/seed.js')




//ROUTES//
app.get('/' , (req, res) => {
    res.render('index.ejs' , {
        allActors : seed
    })
})

app.get('/reference', (req, res) => {
    res.send(seed)
})


app.listen(3000)

