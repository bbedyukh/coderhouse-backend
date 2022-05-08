import Purchase from '../models/Purchase.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import CartService from './cartService.js'

const cartService = new CartService()

export default class PurchaseService {
  async getPurchases () {
    return await Purchase.find()
  }

  async getPurchaseById (purchaseId) {
    if (!purchaseId) throw new Error('Missing \'purchaseId\' parameter!')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    return purchase
  }

  async createPurchase (productsId, userId) {
    if (!productsId || !userId) throw new Error('Missing \'productsId\' or \'userId\' parameter!')

    const user = await User.findById(userId)
    if (!user) throw new Error('User not found.')

    productsId.forEach(async productId => {
      const product = await Product.findById(productId)
      if (!product) throw new Error(`Product ${product.name} not found.`)
    })

    const newPurchase = await Purchase.create({ products: productsId, user: userId })
    const purchase = await newPurchase.populate('products')

    if (purchase) {
      cartService.deleteCart(user.cart)
    }

    return purchase
  }

  async updatePurchaseById (purchaseId, name) {
    if (!purchaseId || !name) throw new Error('Missing or empty \'purchaseId\' or \'name\' purchase.')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    const purchaseFound = await Purchase.findOne({ _id: { $ne: purchaseId }, name: { $eq: name } })
    if (purchaseFound) throw new Error('Purchase already exists.')

    const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, { name }, { new: true })
    return updatedPurchase
  }

  async deletePurchaseById (purchaseId) {
    if (!purchaseId) throw new Error('Missing \'purchaseId\' parameter!')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    await Purchase.findByIdAndDelete(purchaseId)
  }
}
