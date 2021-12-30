import FirebaseContainer from '../../containers/firebaseContainer.js'
import { __dirname } from '../../utils.js'
import { unlink } from 'fs'

export default class ProductsFirebase extends FirebaseContainer {
  constructor () {
    super()
    this.productsRef = this.db.collection('products')
  }

  async getProducts () {
    try {
      const documents = await this.productsRef.get()
      const products = documents.docs.map(p => {
        const product = p.data()
        product.id = p.id
        return product
      })
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async getProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')
      const document = await this.productsRef.doc(productId).get()
      const product = document.data()
      if (!product) throw new Error('Non-existent product.')
      product.id = document.id
      return { status: 'success', payload: product }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async createProduct (product) {
    try {
      if (Object.keys(product).length === 0) throw new Error('Missing or empty \'body product\' parameter!')
      if (!product.name || !product.description || !product.code || !product.picture || !product.price || !product.stock || !product.category) throw new Error('Body product parameter is badly formed.')
      const hasProduct = await this.productsRef.where('name', '==', product.name).get()
      if (!hasProduct.empty) throw new Error('Product already exists.')
      product.stock = parseInt(product.stock)
      product.price = parseInt(product.price)
      const created = await this.productsRef.add(product)
      return { status: 'success', message: `Product with ID ${created.id} has been created successfully.` }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async updateProductById (productId, product) {
    try {
      if (!productId || Object.keys(product).length === 0) throw new Error('Missing or empty \'productId\' or \'body product\' parameter!')
      if (!product.name || !product.description || !product.code || !product.picture || !product.price || !product.stock || !product.category) throw new Error('Body product parameter is badly formed.')
      const document = this.productsRef.doc(productId)

      const result = await document.get()
      const productExists = result.data()
      if (!productExists) throw new Error('Product not found.')

      product.stock = parseInt(product.stock)
      product.price = parseInt(product.price)
      await document.update(product)
      return { status: 'success', message: 'Product has been updated successfully.' }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')
      const document = this.productsRef.doc(productId)
      const result = await document.get()
      const product = result.data()
      await document.delete()
      const picture = product.picture
      const index = picture.lastIndexOf('/') + 1
      const pictureName = picture.substring(index, picture.length)
      unlink(__dirname + '/uploads/' + pictureName, (err) => {
        if (err) throw err
        console.log(`Picture ${pictureName} has been deleted successfully from server.`)
      })
      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }
}
