import { Model } from 'mongoose'

export type TFullName = {
  firstName: string
  lastName: string
}
export type TAddress = {
  street: string
  city: string
  country: string
}

export type TOrder = {
  productName: string
  price: string
  quantity: string
}

export type TUser = {
  userId: string
  username: string
  password: string
  fullName: TFullName
  age: string
  email: string
  isActive: string
  hobbies: string[]
  address: TAddress
  orders: TOrder[]
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>
}

// export type UserMethods = {
//   isUserExists(id: string): Promise<TUser | null>
// }
// export type UserModel = Model<TUser, Record<string, never>, UserMethods>
