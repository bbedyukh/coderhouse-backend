import MongoDBContainer from '../../containers/mongoDBContainer.js'
import { ProductModel } from '../models/Product.js'

export default class ProductsMongoDB extends MongoDBContainer {
  async getProducts () {
    try {
      const products = await ProductModel.find()
      return { status: 'success', payload: products }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async getProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const product = await ProductModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      return { status: 'success', payload: product }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async createProduct (body) {
    try {
      if (Object.keys(body).length === 0) throw new Error('Missing or empty \'body product\' parameter!')
      if (!body.name || !body.description || !body.code || !body.picture || !body.price || !body.stock || !body.category) throw new Error('Body product parameter is badly formed.')

      const product = await ProductModel.findOne({ name: { $eq: body.name } })
      if (product) throw new Error('Product already exists.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      const created = await ProductModel.create(body)

      return { status: 'success', message: `Product ID ${created._id} has been created successfully.` }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async updateProductById (productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body product\' parameter!')
      if (!body.name || !body.description || !body.code || !body.picture || !body.price || !body.stock || !body.category) throw new Error('Body product parameter is badly formed.')

      const product = await ProductModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      const productFound = await ProductModel.findOne({ _id: { $ne: productId }, name: { $eq: body.name } })
      if (productFound) throw new Error('Product already exists.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      await ProductModel.findByIdAndUpdate(productId, { $set: body })

      return { status: 'success', message: 'Product has been updated successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const product = await ProductModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      await ProductModel.findByIdAndDelete(productId)
      super.deleteFileFromServer(product)

      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }
}
