// import { Schema, model, connect } from 'mongoose'

export type UsersFullName = {
  firstName: string
  lastName: string
}
export type UsersAddress = {
  street: string
  city: string
  country: string
}

export type Order = {
  productName: string
  price: string
  quantity: string
}

export type Users = {
  userId: string
  username: string
  password: string
  fullName: UsersFullName
  age: string
  email: string
  isActive: boolean
  hobbies: string[]
  address: UsersAddress
  orders: Order[]
}
