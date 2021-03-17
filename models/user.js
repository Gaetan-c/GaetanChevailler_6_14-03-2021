const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Adresse email invalide"]},
    password: {type: String, required: true},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)