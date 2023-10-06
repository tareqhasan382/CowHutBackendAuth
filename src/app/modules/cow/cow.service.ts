import httpStatus from 'http-status'
// Bussiness logic

import ApiError from '../../../errors/ApiError'
import { ICow } from './cow.interface'
import CowModel from './cow.model'
import { IpaginationsType } from '../../../shared/paginationType'
import { IGenericResponse } from '../../../shared/igenericResponse'
import { paginationHelpers } from '../../../shared/paginationHelper'
import { SortOrder } from 'mongoose'
// create cow

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = await CowModel.create(cow)

  const result = await createdCow.save()
  // jodi cow create na hoy
  if (!result) {
    throw new ApiError(400, 'Failed to create cow!')
  }
  return createdCow

  // http://localhost:8000/api/v1/cows/create-cow
}
// get all cow  IGenericResponse // calculatePagination(paginationOptions);
const getAllCows = async (
  paginationOptions: IpaginationsType
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder, filter } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await CowModel.find(filter)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await CowModel.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get single cow
const getSingleCow = async (id: string): Promise<ICow[]> => {
  //console.log(id)

  const data = CowModel.findById(id)

  const result = CowModel.find(data).populate('seller')

  return result
}

// update cow // const { id } = req.params;
//const cow = await CowModel.findByIdAndUpdate(id, req.body, { new: true });

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  // console.log('id:', id)
  const find_id = await CowModel.findOne({ _id: id })

  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cow not found !')
  }
  const result = await CowModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  // console.log('Service:', result)
  return result
}
// delete cow
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await CowModel.findByIdAndDelete(id)
  return result
}

// http://localhost:8000/api/v1/cows//get-all-cow
export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
