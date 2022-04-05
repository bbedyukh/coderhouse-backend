import { Router } from 'express'
import uploadService from '../services/uploadService.js'
import { createUser, fetchUsers, fetchUser, updateUser, deleteUser } from '../controllers/userController.js'
const userRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        username:
 *          type: string
 *        phone:
 *          type: string
 *        address:
 *          type: string
 *        age:
 *          type: number
 *        avatar:
 *          type: string
 *        role:
 *          type: string
 *      example:
 *        firstName: Bogdan
 *        lastName: Bedyukh
 *        email: bedyukhedits@gmail.com
 *        password: "12345678"
 *        username: bbedyukh
 *        phone: "+5491122334455"
 *        address: Avenida Rivadavia 1234
 *        age: 25
 *        avatar: https://i.imgur.com/j9XyQ8l.jpg
 *        role: user
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user.
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Returns a new user created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 */

userRouter.post('/', uploadService.single('avatar'), createUser)

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users.
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Returns all users created.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

userRouter.get('/', fetchUsers)

/**
 * @swagger
 * /api/users/{userId}:
 *  get:
 *    summary: Get a user.
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of user to get
 *    responses:
 *      200:
 *        description: Returns a specific user.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 */

userRouter.get('/:userId', fetchUser)

/**
 * @swagger
 * /api/users/{userId}:
 *  put:
 *    summary: Update a user.
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of user to update.
 *    responses:
 *      200:
 *        description: Returns a user updated.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 */

userRouter.put('/:userId', uploadService.single('avatar'), updateUser)

/**
 * @swagger
 * /api/users/{userId}:
 *  delete:
 *    summary: Delete a user.
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of user to delete
 *    responses:
 *      204:
 *        description: User has been deleted succesfully.
 */

userRouter.delete('/:userId', deleteUser)

export default userRouter
