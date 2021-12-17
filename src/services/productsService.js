import { mariadb } from '../config.js'
import { unlink } from 'fs/promises'
import { __dirname } from '../utils.js'

export default class Products {
  constructor () {
    mariadb.schema.hasTable('products')
      .then(result => {
        if (!result) {
          mariadb.schema.createTable('products', table => {
            table.increments()
            table.string('name').notNullable()
            table.string('description').notNullable()
            table.string('code').notNullable()
            table.string('picture').notNullable()
            table.float('price').notNullable()
            table.integer('stock').notNullable().defaultTo(100)
            table.timestamps(true, true)
          }).then(result => {
            console.log('Products table created successfully.')
          })
        }
      })
  }

  async getProducts () {
    try {
      const products = await mariadb.select().table('products')
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`Error: ${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async getProduct (id) {
    try {
      const product = await mariadb.select().table('products').where('id', id).first()
      if (!product) throw new Error('Product not found.')
      return { status: 'success', payload: product }
    } catch (err) {
      console.log(`Error: ${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async addProduct (item) {
    try {
      const exists = await mariadb.select().table('products').where('name', item.name).first()
      if (exists) throw new Error('Product already exists.')
      await mariadb.insert(item).table('products')
      return { status: 'success', payload: 'Product has been created successfully.' }
    } catch (err) {
      console.log(`Error: ${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async updateProduct (id, item) {
    try {
      const updated = await mariadb.update(item).table('products').where('id', id)
      if (!updated) throw new Error('Product update error.')
      return { status: 'success', payload: 'Product has been updated successfully.' }
    } catch (err) {
      console.log(`Error: ${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProduct (id) {
    try {
      const row = await mariadb.select().table('products').where('id', id).first()
      const product = JSON.parse(JSON.stringify(row))
      const picture = product.picture
      const index = picture.lastIndexOf('/') + 1
      const pictureName = picture.substring(index, picture.length)
      await unlink(__dirname + '/uploads/' + pictureName)
      const deleted = await mariadb.del().table('products').where('id', id)
      if (!deleted) throw new Error('Product delete error.')
      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`Error: ${err}`)
      return { status: 'error', message: err.message }
    }
  }
}
