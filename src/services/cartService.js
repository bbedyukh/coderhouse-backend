import Cart from '../dao/models/Cart.js'
import Product from '../dao/models/Product.js'

export default class CartService {
  async createCart () {
    const cartCreated = await Cart.create({ products: [] })
    return cartCreated
  }

  async addProduct (cartId, productId) {
    if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    const product = await Product.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    const productFound = await Cart.findById(cartId).findOne({ products: productId })
    if (productFound) throw new Error('Product already exists in cart.')

    await Cart.findByIdAndUpdate(cartId, { $push: { products: product } })
  }

  async getProducts (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cart = await Cart.findById(cartId).populate('products')
    if (!cart) throw new Error('Non-existent cart.')

    const products = cart.products
    return products
  }

  async deleteProduct (cartId, productId) {
    if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    const product = await Cart.findById(cartId).findOne({ products: productId })
    if (!product) throw new Error('Non-existent product in cart.')

    await Cart.findByIdAndUpdate(cartId, { $pull: { products: productId } })
  }

  async deleteCart (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    await Cart.findByIdAndDelete(cartId)
  }
}
