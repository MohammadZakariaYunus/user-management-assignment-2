import { User } from '../users.model'
import { TUser } from './users.interface'

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!')
  }
  // const user = new User(userData)
  // const result = await user.save()
  const result = await User.create(userData)
  return result
}
const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getUserByIdFromDB = async (userId: string) => {
  const result = await User.findOne({ userId })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
}
