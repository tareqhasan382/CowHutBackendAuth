import { Model, ObjectId } from 'mongoose'

export type ICow = {
  _id: string
  name: string
  age: number
  price: number
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh'
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej'
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef' | 'Dual Purpose'
  seller: ObjectId // Assuming the seller ID is represented as a string
}

export type ICowModel = Model<ICow, Record<string, unknown>>
