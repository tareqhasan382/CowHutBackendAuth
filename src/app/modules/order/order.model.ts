import { Schema, model } from 'mongoose'
import { IOrder, IOrderModel } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    cow: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const OrderModel = model<IOrder, IOrderModel>('Order', orderSchema)

export default OrderModel
