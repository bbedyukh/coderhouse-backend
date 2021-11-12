const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const products = require('./routes/products')

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  const message = `| Server listen on port ${PORT} |`
  console.log('-'.repeat(message.length))
  console.log(message)
  console.log('-'.repeat(message.length))
})

server.on('error', (error) => console.error(`Error server: ${error}`))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

app.post('/api/uploadFile', upload.single('file'), (req, res) => {
  const files = req.files
  if (!files || files.length === 0) res.status(500).send({ status: 'error', message: 'Error uploading file.' })
  res.send({ status: 'success', message: 'File uploaded successfully.' })
})

// Routers
app.use('/api/products', products)

app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} not found.`)
  res.status(404).json({ status: 'error', message: 'Not found' })
})
