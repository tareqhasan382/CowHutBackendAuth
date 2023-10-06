import { Model } from 'mongoose'

export type IAdmin = {
  _id: string
  password: string
  role: 'admin'
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
}

export type IAdminModel = Model<IAdmin, Record<string, unknown>>

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
