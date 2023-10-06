import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IOrder } from './order.interface'
import { OrderService } from './order.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
// import ApiError from '../../../errors/ApiError'
import CowModel from '../cow/cow.model'
import UserModel from '../users/user.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../users/user.interface'
import mongoose from 'mongoose'
import OrderModel from './order.model'

// create cow
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const foundCow: ICow | null = await CowModel.findById(cow)
    // console.log('cow F', foundCow)
    const foundBuyer: IUser | null = await UserModel.findById(buyer)

    // console.log('cow b', foundBuyer)
    if (!foundCow || !foundBuyer) {
      return res.status(404).json({ message: 'Cow or buyer not found' })
    }

    if (foundBuyer.budget < foundCow.price) {
      return res
        .status(404)
        .json({ message: 'Not enough money to buy the cow' })
    }

    if (foundCow.label !== 'for sale') {
      return res.status(404).json({ message: 'Cow sold out' })
    }

    const updateSellerIncome = await UserModel.updateOne(
      { _id: foundCow.seller },

      { $inc: { income: foundCow.price } },

      { session }
    )
    // ({ _id: id }, payload, {new: true,})
    const updateBuyerBudget = await UserModel.updateOne(
      { _id: buyer }, //buyer
      { $inc: { budget: -foundCow.price } },
      { session }
    )
    console.log('updateBuyerBudget:', updateBuyerBudget)
    // Create an entry in the orders collection
    if (
      updateSellerIncome.modifiedCount === 1 &&
      updateBuyerBudget.modifiedCount === 1
    ) {
      const result = await OrderModel.create(
        [
          {
            cow: foundCow._id,
            buyer: foundBuyer._id,
          },
        ],
        { session }
      )
      await session.commitTransaction()
      session.endSession()
      res
        .status(200)
        .json({ data: result, message: 'Order created successfully!' })
    } else {
      // One of the updates failed, so roll back the transaction
      await session.abortTransaction()
      session.endSession()

      res.status(500).json({ message: 'Transaction failed' })
    }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    res.status(404).json({ data: error, message: 'Transaction failed' })
    console.error('Transaction failed', error)
  }
})

// get all Order===============================================================
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  if (token) {
    const result = await OrderService.getAllOrder(token)
    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
      data: result,
    })
  }
  //console.log(result)
})
// get single user
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await OrderService.getSingleOrder(id)
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  })
})
export const OrderController = { createOrder, getAllOrders, getSingleOrder }
