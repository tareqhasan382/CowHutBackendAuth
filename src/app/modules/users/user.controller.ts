/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret } from 'jsonwebtoken'
import httpStatus from 'http-status'

// Database logic

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  ILoginUserResponse,
  IProfile,
  IRefreshTokenResponse,
  IUser,
} from './user.interface'
import { UserService } from './user.service'
import { Request, Response } from 'express'
import config from '../../../config'
///auth/signup
const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  //     const data = req.body
  const result = await UserService.createUser(data)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})
///auth/login
const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await UserService.loginUser(data)
  const { refreshToken, ...others } = result
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  })
})
///auth/refresh-token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await UserService.refreshToken(refreshToken)
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  })
})

// get all user
const getAllUser = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  res.send(users)
}

// get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const result = await UserService.getSingleUser(id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  })
})

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})

// delete user
// delete cow
const deletedUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  })
})
//profile
const profile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  if (token) {
    const result = await UserService.profile(token)
    sendResponse<IProfile | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile retrieved successfully !',
      data: result,
    })
  }
})
// updateprofile
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  const updatedData = req.body

  if (token && updatedData) {
    const vefifiedUser: any = jwt.verify(token, config.jwt.secret as Secret)
    const id = vefifiedUser.userId
    const result = await UserService.updateUser(id, updatedData)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully !',
      data: result,
    })
  }
})

export const UserController = {
  createUser,
  LoginUser,
  refreshToken,
  getAllUser,
  getSingleUser,
  updateUser,
  deletedUser,
  profile,
  updateProfile,
}
