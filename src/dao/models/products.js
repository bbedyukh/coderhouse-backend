import mongoose from 'mongoose'
const { Schema } = mongoose

const collectionRef = 'products'

export const ProductsSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  description: { type: String, required: true, max: 250 },
  category: { type: String, required: true, max: 50 },
  code: { type: String, required: true, unique: true, max: 10 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  picture: { type: String, required: true, max: 100 }

}, { timestamps: true })

export const productsModel = mongoose.model(collectionRef, ProductsSchema)
