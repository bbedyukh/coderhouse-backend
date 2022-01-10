import express from 'express'
import { createChat, getChats } from '../controllers/chatsController.js'
import uploadService from '../services/uploadService.js'

const chats = express.Router()

chats.get('/', getChats)

chats.post('/', uploadService.single('avatar'), createChat)

export default chats
