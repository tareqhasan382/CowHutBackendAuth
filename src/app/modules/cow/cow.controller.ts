import httpStatus from 'http-status'
// Database logic
import { Request, Response } from 'express'
import { CowService } from './cow.service'
import catchAsync from '../../../shared/catchAsync'
import { ICow } from './cow.interface'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationField } from '../../../shared/paginationConstant'

// create cow
const createCow = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  //const data = req.body
  const result = await CowService.createCow(data)

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  })
})

// get all cow
const getAllCow = catchAsync(async (req: Request, res: Response) => {
  //filter
  const paginationOptions = pick(req.query, paginationField)
  // console.log(paginationOptions)

  const result = await CowService.getAllCows(paginationOptions)
  //console.log(result)
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})
//get single cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CowService.getSingleCow(id)
  //console.log(result)
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully!',
    data: result,
  })
})
// edit cow
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params // const  id  = req.body;
  const updatedData = req.body
  // console.log('data:', id, updatedData)
  const result = await CowService.updateCow(id, updatedData)
  // console.log('Controller :', result)
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully!',
    data: result,
  })
})

// delete cow
const deletedCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await CowService.deleteCow(id)

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  })
})
export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deletedCow,
}
