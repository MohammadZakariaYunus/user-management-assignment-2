export type FullName = {
  firstName: string
  lastName: string
}
export type Address = {
  street: string
  city: string
  country: string
}

export type Order = {
  productName: string
  price: string
  quantity: string
}

export type User = {
  userId: string
  username: string
  password: string
  fullName: FullName
  age: string
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  orders: Order[]
}
