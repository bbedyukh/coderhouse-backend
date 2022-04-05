import { Router } from 'express'
import { fetchCarts, createCart, addProduct, fetchProducts, deleteProduct, deleteCart, fetchCart } from '../controllers/cartController.js'
const cartRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *            type: string
 *        user:
 *          type: string
 *      example:
 *        products: [e5e1f3c68b8b4e6db8e2b8b9c8b8b8b8, e5e1f3c68b8b4e6db8e2b8b9c8b8b8b8, e5e1f3c68b8b4e6db8e2b8b9c8b8b8b8]
 *        user: 624c80cf9c53deb1e4155218
 */

/**
 * @swagger
 * /api/carts:
 *  post:
 *    summary: Create a new cart.
 *    tags: [Cart]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *          example:
 *            user: 624c80cf9c53deb1e4155218
 *    responses:
 *      200:
 *        description: Returns a new cart created.
 */

cartRouter.post('/', createCart)

/**
 * @swagger
 * /api/carts:
 *  get:
 *    summary: Get all carts.
 *    tags: [Cart]
 *    responses:
 *      200:
 *        description: Returns all carts created.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Cart'
 */

cartRouter.get('/', fetchCarts)

/**
 * @swagger
 * /api/carts/{cartId}:
 *  get:
 *    summary: Get a cart.
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: cartId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of cart to get
 *    responses:
 *      200:
 *        description: Returns a specific cart.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */

cartRouter.get('/:cartId', fetchCart)

/**
 * @swagger
 * /api/carts/{cartId}/products/{productId}:
 *  post:
 *    summary: Add product in a existing cart.
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: cartId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of cart to add product.
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of product sto add in cart.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Cart'
 *    responses:
 *      200:
 *        description: Returns a cart with their products.
 */

cartRouter.post('/:cartId/products/:productId', addProduct)

/**
 * @swagger
 * /api/carts/{cartId}/products:
 *  get:
 *    summary: Get products of cart.
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: cartId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of cart to get
 *    responses:
 *      200:
 *        description: Returns the products of cart.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */

cartRouter.get('/:cartId/products', fetchProducts)

cartRouter.delete('/:cartId/products/:productId', deleteProduct)

cartRouter.delete('/:cartId', deleteCart)

export default cartRouter
