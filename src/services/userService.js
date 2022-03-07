import User from '../dao/models/User.js'

export default class UserService {
  async getUsers () {
    return await User.find().populate('role')
  }
}
