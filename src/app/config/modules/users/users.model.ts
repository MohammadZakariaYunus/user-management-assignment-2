import { Schema, model, connect } from 'mongoose'
import { Order, Users, UsersAddress, UsersFullName } from './users.interface'

const userFullNameSchema = new Schema<UsersFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const userAddressSchema = new Schema<UsersAddress>({
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
const userSchema = new Schema<Users>({
  userId: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  fullName: userFullNameSchema,
  age: String,
  email: {
    type: String,
    required: true,
  },
  isActive: Boolean,
  hobbies: [String],
  address: userAddressSchema,
  orders: [orderSchema],
})

const FullName = model
