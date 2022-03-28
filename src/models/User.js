import { Schema } from 'mongoose'

export default class User {
  static get model () {
    return 'User'
  }

  static get schema () {
    return {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, trim: true },
      password: { type: String, required: true },
      username: { type: String, required: true, unique: true, default: 'anonymus' },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true },
      age: { type: Number, required: true, trim: true },
      avatar: { type: String },
      role: { type: String, required: true }
    }
  }
}
