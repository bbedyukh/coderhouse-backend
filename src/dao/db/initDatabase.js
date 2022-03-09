import User from '../models/User.js'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Role, { ROLES } from '../models/Role.js'
import { MAILER_AUTH, PORT } from '../../config/config.js'
import loggerHandler from '../../middlewares/loggerHandler.js'

const logger = loggerHandler()

const initDatabase = async () => {
  try {
    await createCategories()
    await createProducts()
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
    phone: '+541167609138',
    address: 'Avenida Rivadavia 1234',
    age: 27,
    role: await Role.findOne({ name: ROLES.ADMINISTRATOR }),
    avatar: `http://localhost:${PORT}/uploads/4q5MLFM2LZYhEo2r75esQa.jpg`
  }).save()

  logger.info('Users has been initialized successfuly.')
}

const createProducts = async () => {
  const count = await Product.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Product({
      name: 'Final Shine',
      description: 'Quick detailer con potenciadores de brillo, puede ser utilizado en mojado o seco, apto para remover polvillo y lubricar la clay bar.',
      category: await Category.findOne({ name: 'liquid waxes' }),
      code: 'FS500',
      price: 530,
      stock: 100,
      picture: `http://localhost:${PORT}/uploads/1n84DP1SfiWh0C99BoejwTT9.jpg`
    }).save(),
    new Product({
      name: 'Sandia Wax',
      description: 'Cera sintetica que otorga un brillo profundo en un solo paso, de muy facil aplicación y aroma a sandia.',
      category: await Category.findOne({ name: 'liquid waxes' }),
      code: 'SW500',
      price: 550,
      stock: 100,
      picture: `http://localhost:${PORT}/uploads/2JZGevGx3ZI2aOxQ1omZJw.jpg`
    }).save()
  ])

  logger.info('Products has been initialized successfuly.')
}

export default initDatabase
