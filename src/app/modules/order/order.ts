/*

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const foundCow: ICow | null = await CowModel.findById(cow).session(session)
    const foundBuyer: IUser | null = await UserModel.findById(buyer).session(
      session
    )

    if (!foundCow || !foundBuyer) {
      res.status(404).json({ message: 'Cow or buyer not found' })
      return
    }

    if (foundBuyer.budget < foundCow.price) {
      res.status(404).json({ message: 'Not enough money to buy the cow' })
      return
    }

    const savedOrder = await OrderService.createOrder(
      foundCow,
      foundBuyer,
      session
    )

    await session.commitTransaction()
    session.endSession()

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: savedOrder,
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new ApiError(400, 'Failed to create order')
  }
})

=============================================================================
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  const foundCow: ICow | null = await CowModel.findById(cow)
  const foundBuyer: IUser | null = await UserModel.findById(buyer)
  if (!foundCow || !foundBuyer) {
    res.status(404).json({ message: 'Cow or buyer not found' })
    return
  }

  if (foundBuyer.budget < foundCow.price) {
    res.status(404).json({ message: 'Not enough money to buy the cow' })
    return
  }
  try {
    const savedOrder = await OrderService.createOrder(foundCow, foundBuyer)

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: savedOrder,
    })
  } catch (error) {
    throw new ApiError(400, 'Failed to create order')
  }
})

*/
