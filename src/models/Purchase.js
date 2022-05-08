import { Schema, model } from 'mongoose'

const PurchaseSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

const Purchase = model('Purchase', PurchaseSchema)

export default Purchase
