import fs from 'fs'

export default class FileManager {
  constructor () {
    this.fileLocation = 'src/files/products.json'
  }

  async getById (id) {
    try {
      if (!id) throw new Error('Missing \'id\' parameter!')
      const productsFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!productsFile) throw new Error('The document is empty!')

      const product = JSON.parse(productsFile).find(e => e.id === id)
      if (!product) throw new Error('Product not found.')
      return { status: 'success', payload: product }
    } catch (err) {
      console.log(`Read file error: ${err.message}`)
      return { status: 'error', message: 'Product not found.' }
    }
  }

  async save (product) {
    try {
      if (Object.keys(product).length === 0) throw new Error('Missing or empty \'product\' parameter!')
      const productsFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      let products = []
      let id = 1

      if (productsFile) {
        products = JSON.parse(productsFile)
        const ids = products.map(product => product.id)
        const maxId = Math.max(...ids)
        id = maxId + 1
        const product = products.find(e => e.name === product.name)
        if (product) throw new Error('The product already exists with the same name.')
      }

      product.id = id
      product.timestamp = Date.now()
      products = [...products, product]

      await fs.promises.writeFile(this.fileLocation, JSON.stringify(products, null, 2))
      return { status: 'success', payload: product }
    } catch (err) {
      console.log(`Save file error: ${err.message}`)
      return { status: 'error', message: 'Save product error.' }
    }
  }

  async updateById (id, product) {
    try {
      if (!id || Object.keys(product).length === 0) throw new Error('Missing or empty \'id\' or body parameter!')
      const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!readFile) throw new Error('The document is empty!')
      let products = JSON.parse(readFile)
      const hasProduct = products.find(e => e.name === product.name)
      if (hasProduct) throw new Error('The product already exists with the same name.')
      let newProduct = products.find(e => e.id === id)
      if (!newProduct) throw new Error('Product not found.')
      products = products.filter(e => e.id !== id)

      newProduct = {
        ...newProduct,
        timestamp: product.timestamp,
        description: product.description,
        code: product.code,
        stock: product.stock,
        name: product.name,
        price: product.price,
        picture: product.thumbnail
      }

      products = [...products, newProduct]
      await fs.promises.writeFile(this.fileLocation, JSON.stringify(products, null, 2))
      return { status: 'success', message: 'Product updated successfully.' }
    } catch (err) {
      console.log(`Save file error: ${err.message}`)
      return { status: 'error', message: 'Save product error.' }
    }
  }

  async deleteById (id) {
    try {
      if (!id) throw new Error('Missing \'id\' parameter!')
      const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      let products = []

      if (readFile) products = JSON.parse(readFile)
      const idFound = products.find(e => e.id === id)
      if (!idFound) throw new Error(`ID '${id}' not found in document.`)
      let newProducts = products.filter(e => e.id !== id)
      if (newProducts.length === 0) newProducts = ''
      else newProducts = JSON.stringify(newProducts)

      await fs.promises.writeFile(this.fileLocation, newProducts)
      return { status: 'success', message: 'Product deleted successfully.' }
    } catch (err) {
      console.log(`Save file error: ${err.message}`)
      return { status: 'error', message: 'Delete product error.' }
    }
  }

  async getAll () {
    try {
      const productsFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!productsFile) throw new Error('The document is empty!')
      return { status: 'success', payload: JSON.parse(productsFile) }
    } catch (err) {
      console.log(`Read file error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }
}
