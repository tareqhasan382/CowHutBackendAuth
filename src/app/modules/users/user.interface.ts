import { Model } from 'mongoose'

export type IUser = {
  _id: string
  password: string
  role: 'buyer' | 'seller'
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  budget: number
  income: number
}
export type IProfile = {
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
}
export type IUserModel = Model<IUser, Record<string, unknown>>

export type ILoginUser = {
  phoneNumber: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
}
export type ILoginAdmin = {
  phoneNumber: string
  password: string
}

export type ILoginAdminResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IVerifiedLoginAdmin = {
  phoneNumber: string
  role: 'admin'
  //  role: 'admin' | 'seller' | 'buyer'
}

export enum ENUM_ROLE {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}
