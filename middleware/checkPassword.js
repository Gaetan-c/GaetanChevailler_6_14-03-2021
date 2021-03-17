const passwordSchema = require('../models/password')

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        res.writeHead(400, '{"message":" Mot de passe invalide : il vous faut 8 caractères minimum avec une lettre majuscule, une lettre minuscule et un chiffre au minimum"}',
        {'content-type': 'application/json'})
    res.end('mot de passe invalide')
    } else {
        next()
    }
}