/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import config from '../../../config'
import { AdminService } from './admin.service'
import { IAdmin, ILoginAdminResponse } from './admin.interface'
import { IProfile } from '../users/user.interface'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  //     const data = req.body
  const result = await AdminService.createAdmin(data)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})
///admin/login
const LoginAdmin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await AdminService.loginAdmin(data)
  const { refreshToken, ...others } = result
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin logged in successfully!',
    data: others,
  })
})

//profile
const profile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  if (token) {
    const result = await AdminService.profile(token)
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
    const result = await AdminService.updateProfile(id, updatedData)
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully !',
      data: result,
    })
  }
})

export const AdminController = {
  createAdmin,
  LoginAdmin,
  profile,
  updateProfile,
}
