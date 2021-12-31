import FileContainer from '../../containers/fileContainer.js'
import { __dirname } from '../../utils.js'
import fs from 'fs'

export default class ProductsFile extends FileContainer {
  constructor () {
    super(__dirname + '/dao/db/products.json')
  }

  async getProducts () {
    try {
      const productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      const products = productsFile ? JSON.parse(productsFile) : []

      return { status: 'success', payload: products }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async getProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')
      productId = parseInt(productId)

      const productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      const products = productsFile ? JSON.parse(productsFile) : []

      const product = products.find(p => p.id === productId)
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

      const productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      let products = productsFile ? JSON.parse(productsFile) : []

      let product = products.find(e => e.name === body.name)
      if (product) throw new Error('Product already exists.')

      product = {
        id: 1,
        name: body.name,
        category: body.category,
        description: body.description,
        code: body.code,
        timestamp: Date.now(),
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        picture: body.picture
      }

      if (products.length > 0) {
        const ids = products.map(product => product.id)
        const maxId = Math.max(...ids)
        product.id = maxId + 1
      }

      products = [...products, product]

      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))

      return { status: 'success', message: `Product with ID ${product.id} has been created successfully.` }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async updateProductById (productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body product\' parameter!')
      if (!body.name || !body.description || !body.code || !body.picture || !body.price || !body.stock || !body.category) throw new Error('Body product parameter is badly formed.')
      productId = parseInt(productId)

      const productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      let products = productsFile ? JSON.parse(productsFile) : []

      let product = products.find(e => e.id === productId)
      if (!product) throw new Error('Non-existent product.')

      products = products.filter(e => e.id !== productId)

      product = {
        ...product,
        name: body.name,
        category: body.category,
        description: body.description,
        code: body.code,
        timestamp: body.timestamp,
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        picture: body.picture
      }

      products = [...products, product]

      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))

      return { status: 'success', message: 'Product has been updated successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')
      productId = parseInt(productId)

      const productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      let products = productsFile ? JSON.parse(productsFile) : []

      const product = products.find(e => e.id === productId)
      if (!product) throw new Error('Non-existent product.')

      super.deleteFileFromServer(product)

      products = products.filter(e => e.id !== productId)
      if (products.length === 0) products = []

      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))

      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }
}
