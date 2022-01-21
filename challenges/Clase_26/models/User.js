import mongoose from 'mongoose'

const collection = 'User'

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  age: Number,
  address: String
})

export const userModel = mongoose.model(collection, UserSchema)