import mongoose from 'mongoose'
import { productsSchema } from './products.js'
const { Schema } = mongoose

const cartsSchema = new Schema({
  products: [productsSchema]
})

export const cartsModel = mongoose.model('carts', cartsSchema)
