import express from 'express'
import cors from 'cors'
// import uploadService from './services/uploadService.js'
import products from './routes/products.js'
import carts from './routes/cart.js'

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
app.use('/api/cart', carts)

// app.post('/api/uploadFile', uploadService.single('file'), (req, res) => {
//   const file = req.file
//   if (!file) res.status(500).send({ status: 'error', message: 'Error uploading file.' })
//   res.send({ status: 'success', message: 'File uploaded successfully.' })
// })

app.use((req, res) => {
  const date = new Date().toISOString()
  console.log(`[${date}] - ${req.method} ${req.path} not found.`)
  res.status(404).json({ error: -2, descripcion: `Path ${req.path} method ${req.method} not implemented.` })
})
