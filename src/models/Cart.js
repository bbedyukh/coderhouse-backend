import { Schema } from 'mongoose'

export default class Cart {
  static get model () {
    return 'Cart'
  }

  static get schema () {
    return {
      products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      user: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
    }
  }
}
