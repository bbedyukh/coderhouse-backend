import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import { MONGO_URI } from './config/config.js'
import { UserModel } from './dao/models/User.js'
import uploadService from './services/uploadService.js'
import passport from 'passport'
import initializePassportConfig from './config/passport.js'
import minimist from 'minimist'
import { fork } from 'child_process'

const minimizedArgs = minimist(process.argv)
const PORT = minimizedArgs.port || 8080
const expires = 10

export const getConnection = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    }
  } catch (err) {
    console.error(err)
  }
}

const app = express()
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`)
  getConnection()
})


app.use(session({
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  secret: "bb3dyukh",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: expires * 1000 }
}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/uploads/', express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initializePassportConfig()
app.use(passport.initialize())
app.use(passport.session())


app.post('/api/register', uploadService.single('avatar'), async (req, res) => {
  try {
    const file = req.file
    const user = req.body
    user.age = parseInt(user.age)
    user.avatar = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`

    const emailFound = await UserModel.findOne({ email: user.email })
    if (emailFound) throw new Error('Email already in use.')

    const usernameFound = await UserModel.findOne({ username: user.username })
    if (usernameFound) throw new Error('Username already in use.')

    await UserModel.create(user)
    res.send({ status: 'success', message: 'Registration has been successfully.' })
  } catch (err) {
    console.error(err)
    res.status(400).send({ status: 'error', message: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Username or password is not complete.')
    const user = await UserModel.findOne({ email: email })
    if (!user) throw new Error('User not found.')
    if (user.password !== password) throw new Error('Incorrect password.')
    req.session.user = {
      username: user.username,
      email: user.email
    }
    res.send({ status: 'success' })
  } catch (err) {
    console.error(err)
    res.status(400).send({ status: 'error', message: err.message })
  }
})

app.get('/api/login', async (req, res) => {
  if (req.user) {
    res.send(req.user)
  }
  else if (req.session.user)
    res.send(req.session.user)
  else
    res.send({ status: 'error', message: 'You are not log in.' })
})

app.post('/api/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.send({ status: 'success', message: 'Se ha cerrado la sesión con éxito.' })
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }), (req, res) => {

})

// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/fail' }), (req, res) => {
//   res.send({ status: 'success', message: 'Ha iniciado sesión en Facebook con éxito.' })
// })

app.get('/fail', (req, res) => {
  res.send({ status: 'error', message: 'Ha fallado el inicio de sesión en Facebook.' })
})

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/home', passport.authenticate('facebook', { failureRedirect: '/fail' }), (req, res) => {
  res.render('home')
})

app.get('/info', (req, res) => {
  res.send({
    status: 'success',
    payload: {
      args: process.argv,
      os: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      execPath: process.execPath,
      processId: process.pid,
      projectFolder: process.cwd()
    }
  })
})

app.get('/api/randoms', async (req, res) => {
  const calculus = fork('calculus', [req.query.cant])
  calculus.on('message', (data) => {
    res.send({ numbers: data })
  })
})