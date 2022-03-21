export default class UserDao {
  constructor () {
    this.users = []
  }

  async getUsers () {
    return this.users
  }

  async getUser (userId) {
    return this.users
  }

  async saveUser (firstName, lastName, email, password, username, phone, address, age, avatar) {

  }

  async updateUser (userId, firstName, lastName, email, password, username, phone, address, age, avatar) {

  }

  async deleteUser (userId) {

  }
}
