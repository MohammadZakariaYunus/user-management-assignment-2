import { Schema, model } from 'mongoose'
import { Address, FullName, Order, User } from './users/users.interface'

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const addressSchema = new Schema<Address>({
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

const orderSchema = new Schema<Order>({
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
const userSchema = new Schema<User>({
  userId: { type: String, unique: true },
  password: { type: String },
  username: { type: String, unique: true },
  fullName: fullNameSchema,
  age: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
})

export const UserModel = model<User>('user', userSchema)
