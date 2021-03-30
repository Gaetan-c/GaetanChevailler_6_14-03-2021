const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const nocache = require('nocache')
require('dotenv').config({path : "./config/.env"}) 
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')
const path = require('path')

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.emdtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(()=>console.log('Connexion à MongoDB réussie !'))
  .catch(()=> console.log('Connexion à MongoDB échouée !'))

const app = express()

// headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
})

const cookieDateEnd = new Date(Date.now() + 86400000) // 24h en milliseconde
app.use(cookieSession({
  name: 'cookie',
  keys: ['key1'],
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: cookieDateEnd
  }
}))

app.use(bodyParser.json())
app.use(helmet())
app.use(nocache())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app