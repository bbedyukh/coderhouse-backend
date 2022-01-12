import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const ChatSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  message: { type: String, required: true }
}, { timestamps: true })

ChatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const ChatModel = model('Chat', ChatSchema)
