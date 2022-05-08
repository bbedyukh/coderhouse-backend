import User from '../models/User.js'
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import { PORT } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'

const logger = loggerHandler()

const initDatabase = async () => {
  try {
    await createProducts()
    await createUsers()
  } catch (err) {
    logger.error(err.message)
  }
}

const createUsers = async () => {
  const count = await User.estimatedDocumentCount()
  if (count > 0) return

  new User({
    first_name: 'Bogdan',
    last_name: 'Bedyukh',
    email: 'bedyukhedits@gmail.com',
    password: await User.encryptPassword('123'),
    username: 'bbedyukh',
    phone: '+541167609138',
    address: 'Avenida Rivadavia 1234',
    age: 27,
    role: 'superadmin',
    profile_picture: `http://localhost:${PORT}/uploads/4q5MLFM2LZYhEo2r75esQa.jpg`,
    cart: await Cart.create({ products: [] })
  }).save()

  logger.info('Users has been initialized successfuly.')
}

const createProducts = async () => {
  const count = await Product.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Product({
      title: 'Final Shine',
      description: 'Quick detailer con potenciadores de brillo, puede ser utilizado en mojado o seco, apto para remover polvillo y lubricar la clay bar.',
      code: 'FS500',
      price: 530,
      stock: 100,
      thumbnail: `http://localhost:${PORT}/uploads/1n84DP1SfiWh0C99BoejwTT9.jpg`
    }).save(),
    new Product({
      title: 'Sandia Wax',
      description: 'Cera sintetica que otorga un brillo profundo en un solo paso, de muy facil aplicación y aroma a sandia.',
      price: 550,
      code: 'SW500',
      stock: 100,
      thumbnail: `http://localhost:${PORT}/uploads/2JZGevGx3ZI2aOxQ1omZJw.jpg`
    }).save()
  ])

  logger.info('Products has been initialized successfuly.')
}

export default initDatabase
