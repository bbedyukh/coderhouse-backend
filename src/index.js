const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const uploadService = require('./services/uploadService')

const products = require('./routes/products')

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

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(uploadService.single('file'))
app.use('/uploads/', express.static(path.join(__dirname, '/uploads')))

// Routers
app.use('/api/products', products)

app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} not found.`)
  res.status(404).json({ status: 'error', message: 'Not found' })
})

app.post('/api/uploadFile', uploadService.single('file'), (req, res) => {
  const file = req.file
  console.log(file)
  if (!file) res.status(500).send({ status: 'error', message: 'Error uploading file.' })
  res.send({ status: 'success', message: 'File uploaded successfully.' })
})
