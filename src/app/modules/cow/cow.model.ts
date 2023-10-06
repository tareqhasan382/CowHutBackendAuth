import { Schema, model } from 'mongoose'
import { ICow, ICowModel } from './cow.interface'
const userSchema = new Schema<ICow>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: {
    type: String,
    enum: [
      'Dhaka',
      'Chattogram',
      'Barishal',
      'Rajshahi',
      'Sylhet',
      'Comilla',
      'Rangpur',
      'Mymensingh',
    ],
    required: true,
  },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: ['for sale', 'sold out'], default: 'for sale' },
  category: {
    type: String,
    enum: ['Dairy', 'Beef', 'Dual Purpose'],
    required: true,
  },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const CowModel = model<ICow, ICowModel>('Cow', userSchema)

export default CowModel
