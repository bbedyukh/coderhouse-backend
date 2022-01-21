import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import initializePassportConfig from './config/passport.js'
import { __dirname } from '../../src/utils.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

export const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  const message = `| Server listen on port ${PORT} |`
  const link = `| - http://localhost:${PORT}    |`
  console.log('-'.repeat(message.length))
  console.log(message)
  console.log(link)
  console.log('-'.repeat(message.length))
})
server.on('error', (err) => console.error(`Error server: ${err}`))
const connection = mongoose.connect(process.env.MONGO_URI)

app.use(cors())
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  secret: 'c0d3rF4c3b00k',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static('public'))
app.use(express.json())
initializePassportConfig()
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }), (req, res) => {

})

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail' }), (req, res) => {
  res.send({ status: 'success', message: 'Ha iniciado sesión en Facebook con éxito.' })
})

app.get('/fail', (req, res) => {
  res.send({ status: 'error', message: 'Ha fallado el inicio de sesión en Facebook.' })
})

app.get('/logout', (req, res) => {
  req.logout()
})