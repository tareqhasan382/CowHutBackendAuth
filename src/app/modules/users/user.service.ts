/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import {
  ILoginUser,
  ILoginUserResponse,
  IProfile,
  IRefreshTokenResponse,
  IUser,
} from './user.interface'
import UserModel from './user.model'
import config from '../../../config'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await UserModel.create(user)
  // jodi user create na hoy
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create user!')
  }
  return createdUser
  //http://localhost:8000/api/v1/users/create-user
}
///auth/login
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { password, phoneNumber } = payload
  // check exist user
  const isUserExist = await UserModel.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  )
  //console.log('User Login: ', isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // check match password
  const isMatchPassword = await bcrypt.compare(password, isUserExist?.password)
  if (!isMatchPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  // create jwt token
  //create access token & refresh token
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
  // console.log('refresh token : ', refreshToken)
  return {
    accessToken,
    refreshToken,
  }
}

//==============refresh Token===============================
const refreshToken = async (Token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let vefifyToken = null
  try {
    vefifyToken = jwt.verify(Token, config.jwt.refresh_secret as Secret)
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }
  // if delete user But Have refreshToken  cheacking
  const { userId }: any = vefifyToken
  const isExist = await UserModel.findOne({ _id: userId })
  //console.log('isExist : ', isExist)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist ')
  }
  // genarate new access token
  const accessToken = jwt.sign(
    { userId: isExist._id, role: isExist.role },
    config.jwt.secret as Secret,
    { expiresIn: '1d' }
  )
  //console.log('newAccessToken : ', newAccessToken)
  return {
    accessToken,
  }
}

// get all cow
const getAllUsers = async (): Promise<IUser[]> => {
  return UserModel.find().select('-password')
}

// sigle user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findOne({ _id: id }).select('-password')
  return result
}

// edit user
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const find_id = await UserModel.findOne({ _id: id }).select('-password')
  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }
  const result = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

// delete Usser
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findByIdAndDelete(id)
  return result
}
//profile
const profile = async (token: string): Promise<IProfile | null> => {
  const vefifiedUser: any = jwt.verify(token, config.jwt.secret as Secret)
  const result: IProfile | null = await UserModel.findOne(
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
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const find_id = await UserModel.findOne({ _id: id }).select('_id')
  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }
  const result = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  profile,
  updateProfile,
}
