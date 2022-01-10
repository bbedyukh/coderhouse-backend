import express from 'express'
import cors from 'cors'
import { generate, __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { getConnection } from './dao/db/connection.js'
import { createChat, getChats } from './controllers/chatsController.js'
import { PORT } from './config/config.js'
import chats from './routes/chats.js'

const app = express()
let server
getConnection()
  .then(() => {
    server = app.listen(PORT, () => console.log(`Listening on ${PORT} port.`))
  })
  .catch((err) => console.error(err))

const io = new Server(server)

io.on('connection', socket => {
  console.log('Cliente conectado.')
  getChats()
    .then(result => {
      io.emit('chats', result.payload)
    })
    .catch(err => {
      console.error(err)
    })
  socket.on('chats', data => {
    createChat(data)
      .then(result => console.log(result.payload))
      .then(() => {
        getChats()
          .then(result => {
            io.emit('chats', result.payload)
          })
          .catch(err => {
            console.error(err)
          })
      })
  })
})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/chats', chats)

app.get('/api/products-test', (req, res) => {
  try {
    const quantity = req.query.quantity ? parseInt(req.query.quantity) : 5
    res.send({ status: 'success', payload: generate(quantity) })
  } catch (err) {
    console.error(err)
    res.send({ status: 'error', message: err.message })
  }
})
