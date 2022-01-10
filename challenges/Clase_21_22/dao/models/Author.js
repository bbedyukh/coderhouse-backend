import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const AuthorSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  alias: { type: String, required: true },
  avatar: { type: String, required: true }
}, { timestamps: true })

AuthorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const AuthorModel = model('Author', AuthorSchema)
