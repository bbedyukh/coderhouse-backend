import fs from 'fs'
import { __dirname } from '../utils.js'
import { ProductModel } from '../dao/models/Product.js'

export default class ProductsService {
  getProducts = async () => await ProductModel.find()

  getProduct = async (productId) => {
    if (!productId) throw new Error('Missing \'productId\' parameter!')

    const product = await ProductModel.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    return product
  }

  createProduct = async (product) => {
    if (Object.keys(product).length === 0) throw new Error('Missing or empty \'body\' product.')
    let { name, category, description, code, picture, price, stock } = product
    if (!name || !category || !description || !code || !picture || !price || !stock) throw new Error('Body product is badly formed.')

    const productFound = await ProductModel.findOne({ name: { $eq: name } })
    if (productFound) throw new Error('Product already exists.')

    stock = parseInt(stock)
    price = parseInt(price)

    const productCreated = await ProductModel.create(product)
    return productCreated
  }

  updateProduct = async (productId, body) => {
    if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body\' product.')
    let { name, category, description, code, picture, price, stock } = body
    if (!name || !category || !description || !code || !picture || !price || !stock) throw new Error('Body product is badly formed.')

    const product = await ProductModel.findById(productId)
    if (!product) throw new Error('Non-existent product.')
    
    const productFound = await ProductModel.findOne({ _id: { $ne: productId }, name: { $eq: name } })
    if (productFound) throw new Error('Product already exists.')

    stock = parseInt(stock)
    price = parseInt(price)

    await ProductModel.findByIdAndUpdate(productId, { $set: body })
  }

  deleteProduct = async (productId) => {
    if (!productId) throw new Error('Missing \'productId\' parameter!')

    const product = await ProductModel.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    await ProductModel.findByIdAndDelete(productId)
    this.deleteFileFromServer(product)
  }

  deleteFileFromServer = async (product) => {
    try {
      if (!product) throw new Error('Missing \'product\' parameter')
      const picture = product.picture
      const index = picture.lastIndexOf('/') + 1
      const pictureName = picture.substring(index, picture.length)
      await fs.promises.unlink(__dirname + '/uploads/' + pictureName)
      console.log(`Picture ${pictureName} has been deleted successfully from server.`)
    } catch (err) {
      console.error(err)
    }
  }
}
