/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret } from 'jsonwebtoken'
import { IOrder } from './order.interface'
import OrderModel from './order.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../users/user.interface'
import ApiError from '../../../errors/ApiError'
import config from '../../../config'
import CowModel from '../cow/cow.model'

//// http://localhost:8000/api/v1/order/create-Order
const createOrder = async (cow: ICow, buyer: IUser): Promise<IOrder> => {
  const createdOrder = await OrderModel.create({ cow, buyer: buyer })

  const result = await createdOrder.save()
  // jodi cow create na hoy
  if (!result) {
    throw new ApiError(400, 'Failed to create Order!')
  }

  return createdOrder
}

// get all order
const getAllOrder = async (token: string) => {
  const vefifiedUser: any = jwt.verify(token, config.jwt.secret as Secret)
  console.log(vefifiedUser.userId, vefifiedUser.role)

  if (vefifiedUser.role == 'seller') {
    const findcow = await CowModel.find({
      seller: vefifiedUser.userId,
    }).select('_id')

    const result = await OrderModel.find({ cow: findcow }).populate('cow')
    return result
  } else if (vefifiedUser.role == 'buyer') {
    const result = OrderModel.find({ buyer: vefifiedUser.userId }).populate(
      'cow'
    )
    return result
  } else if (vefifiedUser.role == 'admin') {
    const result = OrderModel.find()
      .populate('cow', { name: 1, phoneNumber: 1, location: 1, _id: 1 })
      .populate('buyer', { name: 1, phoneNumber: 1, address: 1, _id: 1 })
      .exec()
    return result
  }
}
// sigle user
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await OrderModel.findOne({ _id: id })
    .populate('cow', { name: 1, phoneNumber: 1, location: 1, _id: 1 })
    .populate('buyer', { name: 1, phoneNumber: 1, address: 1, _id: 1 })
    .exec()
  return result
}

export const OrderService = { createOrder, getAllOrder, getSingleOrder }
