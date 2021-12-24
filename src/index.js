import app from './server.js'
import { PORT } from './config/config.js'
import { getConnection } from './dao/db/connection.js'

getConnection()
  .then(message => {
    console.log(message)

    const server = app.listen(PORT, () => {
      const message = `| Server listen on port ${PORT} |`
      const link = `| - http://localhost:${PORT}    |`
      console.log('-'.repeat(message.length))
      console.log(message)
      console.log(link)
      console.log('-'.repeat(message.length))
    })
    server.on('error', (error) => console.error(`Error server: ${error}`))
  })
  .catch(err => {
    console.log(err)
  })
