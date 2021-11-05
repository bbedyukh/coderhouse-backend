const express = require('express')
const Container = require('./classes/Container')
const file = new Container('./products.json')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    const message = `| Server listen on port ${PORT} |`
    console.log('-'.repeat(message.length))
    console.log(message)
    console.log('-'.repeat(message.length))
})

server.on('error', error => console.error(`Error server: ${error}`))

app.get('/', (req, res) => {
    res.send(
        `<h1 style='color: blue;text-align:center;'>¡Bienvenido a Express API!</h1>`
    )
})

app.get('/productos', (req, res) => {
    file.getAll()
        .then(products => res.send(products))
        .catch(err => console.log(err))
})

app.get('/productoRandom', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    file.getById(randomNumber)
        .then(product => res.send(product))
        .catch(err => console.log(err))
})
