import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import products from './routes/products.js'
import Container from './classes/Container.js'
import { sqlite } from './config.js'
import dotenv from 'dotenv'
dotenv.config()

const isRoleAdministrator = true
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  const message = `| Server listen on port ${PORT} |`
  const link = `| - http://localhost:${PORT}    |`
  console.log('-'.repeat(message.length))
  console.log(message)
  console.log(link)
  console.log('-'.repeat(message.length))
})

server.on('error', (error) => console.error(`Error server: ${error}`))

/// /////////////////
///   WebSocket  ////
/// /////////////////

const io = new Server(server)
const container = new Container(sqlite, 'chats')

io.on('connection', socket => {
  console.log('Cliente conectado.')
  container.getMessages().then(result => {
    if (result.status === 'success') {
      io.emit('chats', result.payload)
    }
  })
  socket.on('chats', data => {
    container.saveMessage(data)
      .then(result => console.log(result))
      .then(() => {
        container.getMessages().then(result => {
          if (result.status === 'success') {
            io.emit('chats', result.payload)
          }
        })
      })
  })
})

/// ///////////////
/// Middleware ////
/// ///////////////

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(' ')[0], req.method, req.url)
  req.auth = isRoleAdministrator
  next()
})
app.use('/uploads/', express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/public'))

/// ///////////////
///   Routers  ////
/// ///////////////

app.use('/api/products', products)

app.use((req, res) => {
  res.render('index')
})
