import ChatsService from '../services/chatsService.js'
import dotenv from 'dotenv'
dotenv.config()

const service = new ChatsService()

export const getChats = async (req, res) => {
  return service.getChats()
    .then(chats => {
      res.status(200).json({ status: 'success', payload: chats })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}

export const createChat = async (req, res) => {
  const file = req.file
  const chat = req.body
  console.log('file', file)
  chat.avatar = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  console.log('chat', chat)
  return service.createChat(chat)
    .then(result => {
      res.status(200).json({ status: 'success', payload: result })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ status: 'error', message: err.message })
    })
}
