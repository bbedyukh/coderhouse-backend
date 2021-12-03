import express from 'express'
import FileManager from '../classes/fileManager.js'
import uploadService from '../services/uploadService.js'
const fileManager = new FileManager()
const products = express.Router()

products.get('/', (req, res) => {
  fileManager.getAll().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  fileManager.getById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', uploadService.single('file'), (req, res) => {
  const file = req.file
  const product = req.body
  product.thumbnail = `${req.protocol}://${req.hostname}:8080/uploads/${file.filename}`
  fileManager.save(product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const product = req.body
  fileManager.updateById(id, product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  fileManager.deleteById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default products