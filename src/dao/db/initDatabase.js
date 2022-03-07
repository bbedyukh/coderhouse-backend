import Role, { ROLES } from '../models/Role.js'
import User from '../models/User.js'
import { MAILER_AUTH } from '../../config/config.js'
import loggerHandler from '../../middlewares/loggerHandler.js'
import Category from '../models/Category.js'
const logger = loggerHandler()

const initDatabase = async () => {
  try {
    await createCategories()
    await createRoles()
    await createUsers()
  } catch (err) {
    logger.error(err.message)
  }
}

const createCategories = async () => {
  const count = await Category.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Category({ name: 'liquid waxes' }).save(),
    new Category({ name: 'conditioners' }).save()
  ])

  logger.info('Categories has been initialized successfuly.')
}

const createRoles = async () => {
  const count = await Role.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Role({ name: ROLES.ADMINISTRATOR }).save(),
    new Role({ name: ROLES.USER }).save()
  ])

  logger.info('Roles has been initialized successfuly.')
}

const createUsers = async () => {
  const count = await User.estimatedDocumentCount()
  if (count > 0) return

  new User({
    firstName: 'Bogdan',
    lastName: 'Bedyukh',
    email: MAILER_AUTH.USER,
    password: await User.encryptPassword('123'),
    username: 'bbedyukh',
    phone: '5491167609138',
    address: 'Avenida Rivadavia 1234',
    age: 27,
    role: await Role.findOne({ name: ROLES.ADMINISTRATOR })
  }).save()

  logger.info('Users has been initialized successfuly.')
}

export default initDatabase
