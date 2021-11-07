const express = require('express')
const routes = require('./routes/routes')

const app = express()

const PORT = process.env.PORT || 8443

const server = app.listen(PORT, () => {
    const message = `| Server listen on port ${PORT} |`
    console.log('-'.repeat(message.length))
    console.log(message)
    console.log('-'.repeat(message.length))
})

server.on('error', error => console.error(`Error server: ${error}`))

app.use('', routes)
