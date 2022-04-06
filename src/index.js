import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

app.listen(3000, () => console.log('Now listening...'))

let clients = []
let counter = 1

const schema = buildSchema(`
  type Client{
    id: Int
    name: String!
    phone: String
  }

  type Query {
    clients: [Client]
    clientById(id: Int): Client
  }

  type Mutation {
    createClient(name: String, phone: String): Client
  }
`)

const root = {
  clients: () => clients,
  clientById: (data) => {
    return clients.find(client => client.id === data.id)
    // for (let i = 0; i < clients.length; i++) {
    //   if (clients[i].id === clientId) return clients[i]
    // }
    // return null
  },
  createClient: ({ name, phone }) => {
    const client = { id: counter, name, phone }
    clients = [
      ...clients,
      client
    ]
    counter++
    return client
  }
}

app.use('/api/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))
