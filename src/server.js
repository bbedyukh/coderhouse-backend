import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import uploadService from './services/uploadService.js'
import products from './routes/products.js'
import FileManager from './classes/fileManager.js'
const fileManager = new FileManager()

export const { pathname: pathRoot } = new URL('./', import.meta.url)
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

/// ////////////////////
/// Template engine ////
/// ////////////////////

app.set('views', pathRoot + '/views')

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

/// ///////////////
/// WebSockets ////
/// ///////////////

const io = new Server(server)
const arrayProducts = []
const chat = []
io.on('connection', socket => {
  console.log('A client has been connected!')
  socket.emit('welcome', { message: 'Welcome to server!' })

  socket.emit('products', arrayProducts)
  socket.on('products', data => {
    arrayProducts.push(data)
    io.emit('products', arrayProducts)
  })

  socket.emit('chat', chat)
  socket.on('chat', data => {
    chat.push({ email: data.email, date: data.date, message: data.message })
    io.emit('chat', chat)
  })
})

/// ///////////////
/// Middleware ////
/// ///////////////

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/uploads/', express.static(pathRoot + '/uploads'))
app.use(express.static(pathRoot + '/public'))

/// ///////////////
///   Routers  ////
/// ///////////////

app.use('/api/products', products)

// app.get('/', (req, res) => {
//   res.send('Welcome to Gläzen API.')
// })

app.get('/', (req, res) => {
  res.render('index', {})
})

app.post('/api/uploadFile', uploadService.single('file'), (req, res) => {
  const file = req.file
  if (!file) res.status(500).send({ status: 'error', message: 'Error uploading file.' })
  res.send({ status: 'success', message: 'File uploaded successfully.' })
})

app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} not found.`)
  res.status(404).json({ status: 'error', message: 'Not found' })
})
