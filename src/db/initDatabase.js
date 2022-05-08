import User from '../models/User.js'
import Cart from '../models/Cart.js'
import { PORT } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'

const logger = loggerHandler()

const initDatabase = async () => {
  try {
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
    role: 'user',
    profile_picture: `http://localhost:${PORT}/uploads/4q5MLFM2LZYhEo2r75esQa.jpg`,
    cart: await Cart.create({ products: [] })
  }).save()

  new User({
    first_name: 'Mauricio',
    last_name: 'Espinosa',
    email: 'mauricio.espinosa@gmail.com',
    password: await User.encryptPassword('123'),
    username: 'mespinosa',
    phone: '+54113456789',
    address: 'Avenida Rivadavia 1234',
    age: 25,
    role: 'superadmin',
    profile_picture: 'https://curionautas.com/wp-content/uploads/2020/09/dios-nordico-odin.jpg',
    cart: await Cart.create({ products: [] })
  }).save()

  logger.info('Users has been initialized successfuly.')
}

export default initDatabase
