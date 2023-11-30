import { Schema, model } from 'mongoose'
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './users/users.interface'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
})
const userSchema = new Schema<TUser, UserModel>({
  userId: { type: String, unique: true },
  password: { type: String },
  username: { type: String, unique: true },
  fullName: fullNameSchema,
  age: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
})

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id })
  return existingUser
}

export const User = model<TUser, UserModel>('user', userSchema)
