const mongoose = require('mongoose')

const actorSchema = new mongoose.Schema ({
    name: String,
    dob: String,
    bio: String,
    img: String
})

const Actor = mongoose.model('Actor', actorSchema)

module.exports = Actor