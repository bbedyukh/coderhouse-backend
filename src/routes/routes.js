const express = require('express')
const router = express.Router()
const Container = require('../classes/Container')
const file = new Container('./src/files/products.json')

router.get('/', (req, res) => {
    res.send(
        `<h1 style='color: white;background-color:green; padding: 1rem;text-align:center;'>¡Bienvenido a Glazën API!</h1>`
    )
})

router.get('/productos', (req, res) => {
    file.getAll().then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(404).send(result)
    })
})

router.get('/productoRandom', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    file.getById(randomNumber).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(404).send(result)
    })
})

module.exports = router
