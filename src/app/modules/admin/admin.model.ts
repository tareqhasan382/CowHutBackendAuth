import { Schema, model } from 'mongoose'
// import { IUser, IUserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { IAdmin, IAdminModel } from './admin.interface'
const adminSchema = new Schema<IAdmin>(
  {
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
)

adminSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

const AdminModel = model<IAdmin, IAdminModel>('Admin', adminSchema)

export default AdminModel
