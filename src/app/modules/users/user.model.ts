import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
const userSchema = new Schema<IUser>(
  {
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// User.create() / User.save()
userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

const UserModel = model<IUser, IUserModel>('User', userSchema)

export default UserModel
