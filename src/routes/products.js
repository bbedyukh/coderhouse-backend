const express = require('express')
const FileManager = require('../classes/fileManager')
const router = express.Router()
const fileManager = new FileManager()

router.get('/', (req, res) => {
  fileManager.getAll().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  fileManager.getById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

router.post('/', (req, res) => {
  const product = req.body
  fileManager.save(product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const product = req.body
  fileManager.updateById(id, product).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  fileManager.deleteById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

module.exports = router
