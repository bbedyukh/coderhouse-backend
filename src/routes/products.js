import express from 'express'
import FileManager from '../classes/fileManager.js'
import uploadService from '../services/uploadService.js'
const fileManager = new FileManager()
const products = express.Router()
const isRoleAdministrator = false

products.get('/', (req, res) => {
  fileManager.getAll().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.get('/:id/products', (req, res) => {
  const id = Number(req.params.id)
  fileManager.getById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

products.post('/', uploadService.single('picture'), (req, res) => {
  if (isRoleAdministrator) {
    const file = req.file
    const product = req.body
    product.picture = `${req.protocol}://${req.hostname}:8080/uploads/${file.filename}`
    fileManager.save(product).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

products.put('/:id', (req, res) => {
  if (isRoleAdministrator) {
    const id = Number(req.params.id)
    const product = req.body
    fileManager.updateById(id, product).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

products.delete('/:id', (req, res) => {
  if (isRoleAdministrator) {
    const id = Number(req.params.id)
    fileManager.deleteById(id).then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
  } else {
    res.status(500).send({ error: -1, description: `Path ${req.path} method ${req.method} unauthorized` })
  }
})

export default products
