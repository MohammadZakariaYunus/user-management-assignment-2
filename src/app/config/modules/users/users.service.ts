import { User } from '../users.model'
import { TUser } from './users.interface'

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!')
  }

  const result = await User.create(userData)
  return result
}
const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getUserByIdFromDB = async (userId: string) => {
  const result = await User.aggregate([{ $match: { userId: userId } }])
  return result
}

const updateUserFromDB = async (
  userId: string,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
  deleteUserFromDB,
}
