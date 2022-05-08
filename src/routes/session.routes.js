import { Router } from 'express'
import { passportCall } from '../middlewares/passport.js'
import { register, login, logout, current } from '../controllers/sessionController.js'
import uploadService from '../services/uploadService.js'

const sessionRouter = Router()

sessionRouter.post('/register', uploadService.single('profile_picture'), passportCall('register'), register)

sessionRouter.post('/login', passportCall('login'), login)

sessionRouter.get('/current', passportCall('jwt'), current)

sessionRouter.post('/logout', logout)

export default sessionRouter
