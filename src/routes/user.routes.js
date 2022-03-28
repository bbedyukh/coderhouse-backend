import { Router } from 'express'
import uploadService from '../services/uploadService.js'
import { createUser, fetchUsers, fetchUser, updateUser, deleteUser } from '../controllers/userController.js'
const userRouter = Router()

userRouter.post('/', uploadService.single('avatar'), createUser)
userRouter.get('/', fetchUsers)
userRouter.get('/:userId', fetchUser)
userRouter.put('/:userId', uploadService.single('avatar'), updateUser)
userRouter.delete('/:userId', deleteUser)

export default userRouter
