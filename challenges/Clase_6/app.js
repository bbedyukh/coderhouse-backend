const express = require('express')
const moment = require('moment')

const app = express()

const PORT = 8443
let count = 0

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

app.get('/visitas', (req, res) => {
    res.send(`Visita Nº ${count++}`)
})

app.get('/fyh', (req, res) => {
    res.send(moment().format('MMMM Do YYYY, h:mm:ss a'))
})
