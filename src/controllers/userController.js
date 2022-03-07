import loggerHandler from '../middlewares/loggerHandler.js'
import UserService from '../services/userService.js'
const service = new UserService()
const logger = loggerHandler()

export const getUsers = (req, res) => {
  service.getUsers()
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}
