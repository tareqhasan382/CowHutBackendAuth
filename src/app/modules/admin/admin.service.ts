/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from './admin.interface'
import AdminModel from './admin.model'
import config from '../../../config'
import { IProfile } from '../users/user.interface'

const createAdmin = async (user: IAdmin): Promise<IAdmin | null> => {
  const createdAdmin = await AdminModel.create(user)
  // jodi user create na hoy
  if (!createdAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create admin!')
  }
  return createdAdmin
}
///auth/login
const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { password, phoneNumber } = payload
  // check exist user
  const isUserExist = await AdminModel.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // check match password
  const isMatchPassword = await bcrypt.compare(password, isUserExist?.password)
  if (!isMatchPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  // create jwt token
  const accessToken = jwt.sign(
    { userId: isUserExist._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    { expiresIn: '1d' }
  )
  //console.log('access token : ', accessToken)
  const refreshToken = jwt.sign(
    { userId: isUserExist._id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: '365d' }
  )
  return {
    accessToken,
    refreshToken,
  }
}
//profile
const profile = async (token: string): Promise<IProfile | null> => {
  const vefifiedUser: any = jwt.verify(token, config.jwt.secret as Secret)
  const result: IProfile | null = await AdminModel.findOne(
    {
      _id: vefifiedUser.userId,
    },
    { name: 1, phoneNumber: 1, address: 1, _id: 0 }
  )
  return result
}
// edit profile phoneNumber name address
const updateProfile = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const find_id = await AdminModel.findOne({ _id: id }).select('_id')
  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }
  const result = await AdminModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AdminService = {
  createAdmin,
  loginAdmin,
  profile,
  updateProfile,
}
