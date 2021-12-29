import MongoDBContainer from '../../containers/mongoDBContainer.js'
import { __dirname } from '../../utils.js'
import { ProductModel } from '../models/Product.js'
import { unlink } from 'fs'

export default class ProductsMongoDB extends MongoDBContainer {
  async getProducts () {
    try {
      const products = await ProductModel.find()
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async getProductById (productId) {
    try {
      const product = await ProductModel.findById(productId)
      if (!product) throw new Error('Product not found.')
      return { status: 'success', payload: product }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async createProduct (product) {
    try {
      const productExists = await ProductModel.find({ name: { $eq: product.name } })
      if (productExists.length > 0) throw new Error('Product already exists.')
      await ProductModel.create(product)
      return { status: 'success', payload: 'Product has been created successfully.' }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async updateProductById (productId, item) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(productId, { $set: item })
      if (!updated) throw new Error('Product update error.')
      return { status: 'success', payload: 'Product has been updated successfully.' }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductById (productId) {
    try {
      const productDeleted = await ProductModel.findByIdAndDelete(productId)
      if (!productDeleted) throw new Error('Product delete error.')
      const picture = productDeleted.picture
      const index = picture.lastIndexOf('/') + 1
      const pictureName = picture.substring(index, picture.length)
      unlink(__dirname + '/uploads/' + pictureName, (err) => {
        if (err) throw err
        console.log(`Picture ${pictureName} has been deleted successfully from server.`)
      })
      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }
}
