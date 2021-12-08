import fs from 'fs'

export default class CartsManager {
  constructor () {
    this.fileLocation = 'src/files/carts.json'
  }

  async create () {
    try {
      const cartFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
      let carts = []
      const cart = {
        id: 1,
        timestamp: Date.now(),
        products: []
      }

      if (cartFile) {
        carts = JSON.parse(cartFile)
        const ids = carts.map(c => c.id)
        const maxId = Math.max(...ids)
        cart.id = maxId + 1
      }

      carts = [...carts, cart]

      await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
      return { status: 'success', message: `Cart has been created successfully with ID ${cart.id}` }
    } catch (err) {
      console.log(`Create cart error: ${err.message}`)
      return { status: 'error', message: 'Create cart error.' }
    }
  }

  async deleteCartById (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')
      const fileCart = await fs.promises.readFile(this.fileLocation, 'utf-8')
      const carts = JSON.parse(fileCart)

      const cartIdFound = carts.find(c => c.id === cartId)
      if (!cartIdFound) throw new Error(`CartId '${cartId}' not found.`)

      const cart = carts.filter(c => c.id !== cartId)

      await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2))
      return { status: 'success', message: 'Cart has been deleted successfully.' }
    } catch (err) {
      console.log(`Delete cart error: ${err.message}`)
      return { status: 'error', message: 'Delete cart error.' }
    }
  }

  async getAll (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')
      const fileCart = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!fileCart) throw new Error('The document is empty!')
      const products = JSON.parse(fileCart).find(c => c.id === cartId).products
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`Read products cart error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async addProduct (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      const fileProducts = await fs.promises.readFile('src/files/products.json', 'utf-8')
      if (!fileProducts) throw new Error('The document is empty!')
      const products = JSON.parse(fileProducts)
      const productToAdd = products.find(p => p.id === productId)

      const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!fileCarts) throw new Error('The document is empty!')
      const carts = JSON.parse(fileCarts).find(c => c.id === cartId)
      carts.products = [
        ...carts.products,
        productToAdd
      ]

      await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
      return { status: 'success', payload: 'Product has been added successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }

  async deleteProduct (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      const fileProducts = await fs.promises.readFile('src/files/products.json', 'utf-8')
      if (!fileProducts) throw new Error('The document is empty!')
      const products = JSON.parse(fileProducts).filter(p => p.id !== productId)

      const fileCart = await fs.promises.readFile(this.fileLocation, 'utf-8')
      if (!fileCart) throw new Error('The document is empty!')
      const cart = JSON.parse(fileCart).find(c => c.id === cartId)
      cart.products = products

      await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2))
      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }
}
