import { ChatModel } from '../dao/models/Chat.js'

export default class ChatsService {
  async getChats () {
    return await ChatModel.find()
  }

  async createChat (chat) {

  }
}
